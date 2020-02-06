import { FlatTreeControl } from '@angular/cdk/tree';
import { Component, Injectable, OnInit } from '@angular/core';
import { MatTreeFlatDataSource, MatTreeFlattener } from '@angular/material/tree';
import { BehaviorSubject, Observable, of as observableOf } from 'rxjs';
import { CdkDragDrop } from '@angular/cdk/drag-drop';
import { ChapterService } from 'src/app/service/chapter/chapter.service';
import { chapter } from 'src/app/model/chapter/chapter';
import { Router, ActivatedRoute } from '@angular/router';
import { Unit } from 'src/app/model/unit/unit';
import { UnitService } from 'src/app/service/unit/unit.service';
import { mergeMap } from 'rxjs/operators';

/**
 * File node data with nested structure.
 * Each node has a title, and a type or a list of children.
 */
export class SubjectNode {
  id: string;
  children: SubjectNode[];
  title: string;
  parentId: any
  type: any;
  data: any
}

/** Flat node with expandable and level information */
export class SubjectFlatNode {
  constructor(
    public expandable: boolean,
    public title: string,
    public level: number,
    public type: any,
    public id: string,
    public data: any
  ) { }
}

/**
 * The file structure tree data in string. The data could be parsed into a Json object
 */
@Injectable()
export class SubjectDatabase {
  dataChange = new BehaviorSubject<SubjectNode[]>([]);

  get data(): SubjectNode[] { return this.dataChange.value; }

  constructor() {
    this.initialize();
  }

  initialize() {
    // Parse the string to json object.
    const dataObject = {};

    const data = this.buildSubjectTree(dataObject, 0);

    // Notify the change.
    this.dataChange.next(data);
  }

  buildSubjectTree(obj: { [key: string]: any }, level: number, parentId: string = '0'): SubjectNode[] {
    return Object.keys(obj).reduce<SubjectNode[]>((accumulator, key, idx) => {
      const value = obj[key];
      const node = new SubjectNode();
      node.title = key;
      node.data = value;
      node.id = `${parentId}/${idx}`;
      if (value != null) {
        if (typeof value === 'object' && value.data) {
          node.children = this.buildSubjectTree(value.data, level + 1, node.id);
        } else {
          node.type = value;
        }
      }
      return accumulator.concat(node);
    }, []);
  }
}

/**
 * @title Tree with flat nodes
 */
@Component({
  selector: 'app-subject-outline',
  templateUrl: './subject-outline.component.html',
  styleUrls: ['./subject-outline.component.scss'],
  providers: [SubjectDatabase]
})
export class SubjectOutlineComponent {

  treeControl: FlatTreeControl<SubjectFlatNode>;
  treeFlattener: MatTreeFlattener<SubjectNode, SubjectFlatNode>;
  dataSource: MatTreeFlatDataSource<SubjectNode, SubjectFlatNode>;
  expandedNodeSet = new Set<string>();
  dragging = false;
  expandTimeout: any;
  expandDelay = 1000;
  listChapter: chapter[] = [];
  listUnit: Unit[] = [];
  database: SubjectDatabase;

  constructor(database: SubjectDatabase,
    private chapterService: ChapterService,
    private router: Router,
    private activatedRounte: ActivatedRoute,
    private unitService: UnitService) {
    this.treeFlattener = new MatTreeFlattener(this.transformer, this._getLevel,
      this._isExpandable, this._getChildren);
    this.treeControl = new FlatTreeControl<SubjectFlatNode>(this._getLevel, this._isExpandable);
    this.dataSource = new MatTreeFlatDataSource(this.treeControl, this.treeFlattener);
    this.database = database;

    database.dataChange.subscribe(data => this.rebuildTreeForData(data));
  }

  ngOnInit() {
     this.activatedRounte.paramMap.subscribe( params => {
       const subjectId = params.get('subjectId');
       this.chapterService.getChapterBySubjectAndChapterOrderAsc(+subjectId).subscribe(
        async chapters => {
          let _arr = {};
          await this.asyncForEach(chapters, async (chapter) => {
            if(_arr[chapter.name] && _arr[chapter.name].id == chapter.id) {
              _arr[chapter.name] = {
                id: chapter.id,
                data: {}
              }
            } else {
              _arr[chapter.name] = {
                id: chapter.id,
                data: {}
              }
            }
            
            if (chapter.chapters && chapter.chapters.length > 0) {
              await this.asyncForEach(chapter.chapters, async (lesson) => {
                _arr[chapter.name].data[lesson.name] = {
                  id: lesson.id,
                  data: {}
                }
                if (lesson.units && lesson.units.length > 0) {
                  await this.asyncForEach(lesson.units, async (unit) => {
                    _arr[chapter.name].data[lesson.name].data[unit.unit_name] = {
                      id: unit.unit_id,
                      lesson_id: lesson.id,
                      unit_order: unit.unit_order
                    }
                  });
                }
                _arr[chapter.name].data[lesson.name].data["create_"] = {
                  chapter_id: chapter.id,
                  lesson_id: lesson.id
                }
              })
            }
            _arr[chapter.name].data["create_"] = {
              chapter_id: chapter.id
            }
          })
          let data = this.database.buildSubjectTree(_arr, 0);
          this.database.dataChange.next(data);
        })
     })
  }

  async asyncForEach(array: any, callback: any) {
    for (let index = 0; index < array.length; index++) {
      await callback(array[index], index);
    }
  }

  transformer = (node: SubjectNode, level: number) => {
    return new SubjectFlatNode(!!node.children, node.title, level, node.type, node.id, node.data);
  }
  private _getLevel = (node: SubjectFlatNode) => node.level;
  private _isExpandable = (node: SubjectFlatNode) => node.expandable;
  private _getChildren = (node: SubjectNode): Observable<SubjectNode[]> => observableOf(node.children);
  hasChild = (_: number, _nodeData: SubjectFlatNode) => _nodeData.expandable;

  /**
   * This constructs an array of nodes that matches the DOM,
   * and calls rememberExpandedTreeNodes to persist expand state
   */
  visibleNodes(): SubjectNode[] {
    this.rememberExpandedTreeNodes(this.treeControl, this.expandedNodeSet);
    const result = [];

    function addExpandedChildren(node: SubjectNode, expanded: Set<string>) {
      result.push(node);
      if (expanded.has(node.id)) {
        node.children.map(child => addExpandedChildren(child, expanded));
      }
    }
    this.dataSource.data.forEach(node => {
      addExpandedChildren(node, this.expandedNodeSet);
    });
    return result;
  }

  /**
   * Handle the drop - here we rearrange the data based on the drop event,
   * then rebuild the tree.
   * */
  drop(event: CdkDragDrop<string[]>) {
    if (event.item.data.title == '_create') {
      return false
    }
    const visibleNodes = this.visibleNodes();

    // deep clone the data source so we can mutate it
    const changedData = JSON.parse(JSON.stringify(this.dataSource.data));

    // recursive find function to find siblings of node
    function findNodeSiblings(arr: Array<any>, id: string): Array<any> {
      let result, subResult;
      arr.forEach(item => {
        if (item.id === id) {
          result = arr;
        } else if (item.children) {
          subResult = findNodeSiblings(item.children, id);
          if (subResult) result = subResult;
        }
      });
      return result;
    }

    // remove the node from its old place
    const node = event.item.data;
    const siblings = findNodeSiblings(changedData, node.id);
    const siblingIndex = siblings.findIndex(n => n.id === node.id);
    const nodeToInsert: SubjectNode = siblings.splice(siblingIndex, 1)[0];

    // determine where to insert the node
    const nodeAtDest = visibleNodes[event.currentIndex];
    if (nodeAtDest.id === nodeToInsert.id) return;

    // determine drop index relative to destination array
    let relativeIndex = event.currentIndex; // default if no parent
    const nodeAtDestFlatNode = this.treeControl.dataNodes.find(n => nodeAtDest.id === n.id);
    const parent = this.getParentNode(nodeAtDestFlatNode);
    if (parent) {
      const parentIndex = visibleNodes.findIndex(n => n.id === parent.id) + 1;
      relativeIndex = event.currentIndex - parentIndex;
    }
    // insert node 
    const newSiblings = findNodeSiblings(changedData, nodeAtDest.id);
    newSiblings.splice(relativeIndex, 0, nodeToInsert);
    // rebuild tree with mutated data
    this.rebuildTreeForData(changedData);
  }

  /**
   * Experimental - opening tree nodes as you drag over them
   */
  dragStart() {
    this.dragging = true;
  }
  dragEnd(node) {
    this.dragging = false;
  }
  dragHover(node: SubjectFlatNode) {
    if (this.dragging) {
      clearTimeout(this.expandTimeout);
      this.expandTimeout = setTimeout(() => {
        this.treeControl.expand(node);
      }, this.expandDelay);
    }
  }
  dragHoverEnd() {
    if (this.dragging) {
      clearTimeout(this.expandTimeout);
    }
  }

  /**
   * The following methods are for persisting the tree expand state
   * after being rebuilt
   */

  rebuildTreeForData(data: any) {
    this.rememberExpandedTreeNodes(this.treeControl, this.expandedNodeSet);
    this.dataSource.data = data;
    this.forgetMissingExpandedNodes(this.treeControl, this.expandedNodeSet);
    this.expandNodesById(this.treeControl.dataNodes, Array.from(this.expandedNodeSet));
  }

  private rememberExpandedTreeNodes(
    treeControl: FlatTreeControl<SubjectFlatNode>,
    expandedNodeSet: Set<string>
  ) {
    if (treeControl.dataNodes) {
      treeControl.dataNodes.forEach((node) => {
        if (treeControl.isExpandable(node) && treeControl.isExpanded(node)) {
          // capture latest expanded state
          expandedNodeSet.add(node.id);
        }
      });
    }
  }

  private forgetMissingExpandedNodes(
    treeControl: FlatTreeControl<SubjectFlatNode>,
    expandedNodeSet: Set<string>
  ) {
    if (treeControl.dataNodes) {
      expandedNodeSet.forEach((nodeId) => {
        // maintain expanded node state
        if (!treeControl.dataNodes.find((n) => n.id === nodeId)) {
          // if the tree doesn't have the previous node, remove it from the expanded list
          expandedNodeSet.delete(nodeId);
        }
      });
    }
  }

  private expandNodesById(flatNodes: SubjectFlatNode[], ids: string[]) {
    if (!flatNodes || flatNodes.length === 0) return;
    const idSet = new Set(ids);
    return flatNodes.forEach((node) => {
      if (idSet.has(node.id)) {
        this.treeControl.expand(node);
        let parent = this.getParentNode(node);
        while (parent) {
          this.treeControl.expand(parent);
          parent = this.getParentNode(parent);
        }
      }
    });
  }

  private getParentNode(node: SubjectFlatNode): SubjectFlatNode | null {
    const currentLevel = node.level;
    if (currentLevel < 1) {
      return null;
    }
    const startIndex = this.treeControl.dataNodes.indexOf(node) - 1;
    for (let i = startIndex; i >= 0; i--) {
      const currentNode = this.treeControl.dataNodes[i];
      if (currentNode.level < currentLevel) {
        return currentNode;
      }
    }
    return null;
  }

  datademo = {
    subjectId: 1,
    chapterId: 9,
  }

  newUnit(node) {
    if (!node) { // create chapter
      let subjectId = 0; // get subjectId from subject screen
    } else if (node.title == 'create_') { // create lesson || unit
      
      this.activatedRounte.paramMap.subscribe( params => {
        const subjectId = params.get('subjectId');
        this.router.navigate(['cms/createunit/'+ subjectId + '/' + node.data.lesson_id]);
      });
    }
  }

  editUnit(node) {
    if (!node) { // create chapter
      let subjectId = 0; // get subjectId from subject screen
      
    } else if (node.title != 'create_') { // create lesson || unit
      this.activatedRounte.paramMap.subscribe( params => {
        const subjectId = params.get('subjectId');
           this.router.navigate(['cms/editunit/'+ subjectId + '/' + node.data.id]);
      });
    }
  }

}
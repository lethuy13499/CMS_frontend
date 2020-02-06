import { Component, OnInit } from '@angular/core';
import { chapter } from 'src/app/model/chapter/chapter';
import { ChapterService } from 'src/app/service/chapter/chapter.service';
import { ExamService } from 'src/app/service/exam/exam.service';

@Component({
  selector: 'app-trainee-quiz',
  templateUrl: './trainee-quiz.component.html',
  styleUrls: ['./trainee-quiz.component.scss']
})
export class TraineeQuizComponent implements OnInit {
  showModal: boolean;
  content: string;
  title: string;
  showTable: Boolean = true;
listchapter:object[]=[];
list:chapter[]=[];
listExam:object[]=[];
perPage = 5;
  constructor(private chapterService: ChapterService,private examService:ExamService) { }

  ngOnInit() {
    this.chapterService
      .getListChapterByParentId().subscribe(res => (this.list=res ))
      
  }
  onChange(value){
    
    this.examService.getExamResultByLesson(value).subscribe(data=>{
      this.listchapter=data;
      
    })
   }
   onChangepage(event) {
    this.perPage = event.target.value;
  }
   getDimensionsByFind(){
  }
  show(){
    this.showModal = true; 
    
  }
  hide(){
    this.showModal = false;
  }
  }


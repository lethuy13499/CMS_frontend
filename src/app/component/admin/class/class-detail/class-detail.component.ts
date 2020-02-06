import { Component, OnInit } from "@angular/core";
import { ClassService } from "src/app/service/class/class.service";
import { SubjectService } from "src/app/service/subject/subject.service";
import { ProductService } from "src/app/service/product/product.service";
import { UserserviceService } from "src/app/service/user-service/userservice.service";
import { DatePipe } from "@angular/common";
import { Router, ActivatedRoute } from "@angular/router";
import {
  FormBuilder,
  Validators,
  FormArray,
  FormControl,
  FormGroup,
  AbstractControl
} from "@angular/forms";
import { subject } from "src/app/model/subject/subject";
import { MomentInputObject } from "ngx-bootstrap/chronos/test/chain";
import "rxjs/add/observable/forkJoin";
import { Observable } from "rxjs";
function validatorEmptyInput(
  control: AbstractControl
): { [key: string]: boolean } | null {
  const isWhitespace = (control.value || "").trim().length === 0;
  const isValid = !isWhitespace;
  return isValid ? null : { whitespace: true };
}
@Component({
  selector: "app-class-detail",
  templateUrl: "./class-detail.component.html",
  styleUrls: ["./class-detail.component.scss"]
})
export class ClassDetailComponent implements OnInit {
  data: any;
  n: any = 0;
  class: Object;
  product = [];
  user = [];
  user_before_id = [];
  manager_before_id = [];
  manager_before = [];
  manager_after = [];
  manager_final = [];
  trainner_before = [];
  updateForm: FormGroup;
  dropdownSettingUser = {};
  dropdownSettingManage = {};
  selectedManager = [];
  start_date: String;
  end_date: String;
  users: any;
  count = 1;
  trainner_after = [];
  trainner_final: any;
  mapSubject: { [key: number]: string } = {};
  date = [];
  showNoti : boolean;
  error: any;
  constructor(
    private activeRoute: ActivatedRoute,
    private classservice: ClassService,
    private fb: FormBuilder,
    private subjectservice: SubjectService,
    private productservice: ProductService,
    private userservice: UserserviceService,
    private datepipe: DatePipe,
    private router: Router
  ) {}

  ngOnInit() {
    this.updateForm = this.fb.group({
      name: [
        "",
        [Validators.required, Validators.maxLength(250), validatorEmptyInput]
      ],
      date: this.fb.group({
        start_date: ["", [Validators.required]],
        end_date: ["", [Validators.required]]
      }),
      status: ["", [Validators.required]],
      trainner: ["", [Validators.required]],
      manager: ["", [Validators.required]],
      product: ["", [Validators.required]],
      id: [""],
      trainner_id: [""],
      manager_id: [""]
    });
    this.productservice.getlistProduct().subscribe(res => {
      this.product = res;
    });
    this.userservice.getUserList().subscribe(res => {
      this.user = res;
    });
    this.showNoti = false;
    this.dropdownSettingUser = {
      singleSelection: false,
      idField: "id",
      textField: "fullname",
      selectAllText: "Select All",
      unSelectAllText: "UnSelect All",
      itemsShowLimit: 3,
      searchPlaceholderText: "Search",
      allowSearchFilter: true
    };
    this.dropdownSettingManage = {
      singleSelection: true,
      idField: "id",
      textField: "fullname",
      selectAllText: "Select All",
      unSelectAllText: "UnSelect All",
      itemsShowLimit: 3,
      searchPlaceholderText: "Search",
      allowSearchFilter: true
    };
    this.data = this.activeRoute.snapshot.params["id"];
    this.classservice.findClassById(this.data).subscribe(res => {
      this.class = res;
      this.manager_after.push(this.class[0].manager.id);
      this.processStuff(this.manager_after).subscribe(res1 => {
        this.selectedManager = res1;
      });
      this.updateForm.get("id").setValue(this.data);
      this.updateForm.get("name").setValue(this.class[0].name);
      this.updateForm.get("product").setValue(this.class[0].product.productId);
      this.updateForm.get("status").setValue(this.class[0].isDefault);
      this.start_date = this.datepipe.transform(
        this.class[0].startDate,
        "yyyy-MM-dd"
      );
      this.end_date = this.datepipe.transform(
        this.class[0].endDate,
        "yyyy-MM-dd"
      );
      this.updateForm.get("date.start_date").setValue(this.start_date);
      this.updateForm.get("date.end_date").setValue(this.end_date);
      this.user_before_id = this.class[0].trainer.split(",");

      if (this.user_before_id.length > 0) {
        this.processStuff(this.user_before_id).subscribe(res1 => {
          this.trainner_before = res1;
        });
      }

    });
  }
  processStuff(inputObject) {
    let observableBatch: Object[] = [];

    inputObject.forEach((object, key) => {
      observableBatch.push(this.userservice.getUserbyId(object));
    });
    return Observable.forkJoin(observableBatch);
  }

  onSubmitUpdate() {
    // {{debugger}}
   this.date = this.updateForm.get("date").value;
   
   if(this.date["start_date"] < this.date["end_date"]){
   
    this.manager_after = this.updateForm.get("manager").value;
    this.manager_final = this.manager_after[0].id;
    this.updateForm.get("manager_id").setValue(this.manager_final);
    let a = this.updateForm.get("trainner").value;
    for (let i = 0; i < a.length; i++) {
      this.trainner_after.push(a[i].id);
    }
    this.trainner_final = this.trainner_after.join(",");
    this.updateForm.get("trainner_id").setValue(this.trainner_final);
    let Form = JSON.stringify(this.updateForm.value);
    const data = new FormData();
    data.append("formData", JSON.stringify(this.updateForm.value));
    this.classservice.updateClass(data).subscribe(res => {
      if ((res = "true")) {
        this.router.navigate(["/cms/class"]);
      }
    });
  }
  else{
    this.showNoti = true;
    this.error = "Ngày bắt đầu không được nhỏ hơn ngày kết thúc "
  }
  }
  onItemSelect() {}
  onClickCloseForm(){
    this.router.navigate(["/cms/class"]);
  }
}

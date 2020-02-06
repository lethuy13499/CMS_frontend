import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { DatatranferService } from 'src/app/service/datatranfer/datatranfer.service';
import { ExamService } from 'src/app/service/exam/exam.service';


@Component({
  selector: 'app-exam-details',
  templateUrl: './exam-details.component.html',
  styleUrls: ['./exam-details.component.scss']
})
export class ExamDetailsComponent implements OnInit {
  examId;
  exam: any;
  config: any;
  constructor(
    private router: Router,
    private tranfer: DatatranferService,
    private route: ActivatedRoute,
    private examService: ExamService) { }


  ngOnInit() {
    this.examId = this.route.snapshot.paramMap.get("id");
    this.examService.getExamById(this.examId).subscribe(
      res => {
        this.config = res.create_type;
      }
    )

    this.tranfer.currentMessage.subscribe(par => {
      this.config = par;
      
    });
  }

  onClick(s: string) {

    this.router.navigate([s], { relativeTo: this.route });

  }


}

import { animate, animateChild, query, stagger, state, style, transition, trigger } from '@angular/animations';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { Comment } from 'src/app/core/models/comment.model';

@Component({
  selector: 'app-comments',
  templateUrl: './comments.component.html',
  styleUrls: ['./comments.component.scss'],
  animations: [
    trigger('list', [
      transition(':enter', [
          query('@listItem', [
              stagger(50, [
                  animateChild()
              ])
          ])
      ])
  ]),
    trigger('listItem', [
      state('default', style({
        transform: 'scale(1)',
        'background-color': 'white',
        'z-index': 1
      })),
      state('active', style({
        transform: 'scale(1.05)',
        'background-color': 'rgb(201, 157, 242)',
        'z-index': 2
      })),
      transition('default => active', [
        animate('100ms ease-in-out')
      ]),
      transition('active => default', [
        animate('500ms ease-in-out')
      ]),
      transition(':enter', [
        query('span', [
            style({
                opacity: 0
            }),
        ]),
        style({
            transform: 'translateX(-100%)',
            opacity: 0,
            'background-color': 'rgb(201, 157, 242)',
        }),
        animate('250ms ease-out', style({
            transform: 'translateX(0)',
            opacity: 1,
            'background-color': 'white',
        })),
        query('span', [
            animate('500ms', style({
                opacity: 1
            }))
        ]),
    ])
    ])
  ]
})
export class CommentsComponent implements OnInit {

  @Input() comments!:Comment[];
  @Output() newComment = new EventEmitter<string>();

  animationStats: {[key:number] : 'default' | 'active'} = {};
  listItemAnimationState: 'default' | 'active' = 'default';
  commentCtrl!: FormControl

  constructor(private formBuilder: FormBuilder) { }

  ngOnInit(): void {
    this.commentCtrl = this.formBuilder.control('', [Validators.required, Validators.minLength(10)]);
    this.comments.forEach((element,index) => {
      this.animationStats[index] = 'default';
    });
  }

  onLeaveComment():void {
    if(this.commentCtrl.invalid) {
      console.log(this.commentCtrl)
      return;
    }
    const maxId = Math.max(...this.comments.map(comment => comment.id));
    this.comments.unshift({
        id: maxId + 1,
        comment: this.commentCtrl.value,
        createdDate: new Date().toISOString(),
        userId: 1
    });
    this.newComment.emit(this.commentCtrl.value);
    this.commentCtrl.reset();

  };

  onListItemMouseEnter(id:number) {
    this.animationStats[id]  = 'active';
}

onListItemMouseLeave(id:number) {
    this.animationStats[id]  = 'default';
}

}

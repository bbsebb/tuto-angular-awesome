import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { catchError, delay, map, Observable, of, tap, throwError } from 'rxjs';
import { Post } from '../../models/post.model';
import { PostsService } from '../../services/posts.service';

@Component({
  selector: 'app-post-list',
  templateUrl: './post-list.component.html',
  styleUrls: ['./post-list.component.scss']
})
export class PostListComponent implements OnInit {

  posts$!: Observable<Post[]>;
  error:boolean = false;


  constructor(private route: ActivatedRoute, private postsService: PostsService) { }

  ngOnInit(): void {
    this.posts$ = this.route.data.pipe(
      delay(3000),
      map(data => data['posts']),
      catchError(() => {
        this.error=true;
        return of(new Array<Post>)
      })
    );
  }



  onPostCommented( postCommented : { comment: string, postId: number }) {
    this.postsService.addNewComment(postCommented);
  }
}

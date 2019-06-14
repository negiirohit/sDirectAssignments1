import { Component } from '@angular/core';
import { TweetService } from 'src/app/services/tweet.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'tweetPosterFE';
  constructor(private tweetService: TweetService){
    this.tweetService.sendDemoObject({
    //  "demo":[('abc'),('xyz'),('123')]
    "demo":[('abc'),('xyz'),('123')]  
  });
  }
}

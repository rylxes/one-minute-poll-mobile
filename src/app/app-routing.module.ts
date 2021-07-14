import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    loadChildren: () => import('./home/home.module').then(m => m.HomePageModule)
  },
  {
    path: 'home',
    loadChildren: () => import('./home/home.module').then( m => m.HomePageModule)
  },
  {
    path: 'add-new',
    loadChildren: () => import('./add-new/add-new.module').then( m => m.AddNewPageModule)
  },
  {
    path: 'help',
    loadChildren: () => import('./help/help.module').then( m => m.HelpPageModule)
  },
  {
    path: 'my-polls',
    loadChildren: () => import('./my-polls/my-polls.module').then( m => m.MyPollsPageModule)
  },
  {
    path: 'my-profile',
    loadChildren: () => import('./my-profile/my-profile.module').then( m => m.MyProfilePageModule)
  },
  {
    path: 'poll-submitted',
    loadChildren: () => import('./poll-submitted/poll-submitted.module').then( m => m.PollSubmittedPageModule)
  },
  {
    path: 'post-review',
    loadChildren: () => import('./post-review/post-review.module').then( m => m.PostReviewPageModule)
  },
  {
    path: 'view-poll',
    loadChildren: () => import('./view-poll/view-poll.module').then( m => m.ViewPollPageModule)
  },
  {
    path: 'vote',
    loadChildren: () => import('./vote/vote.module').then( m => m.VotePageModule)
  },
  {
    path: 'vote-complete',
    loadChildren: () => import('./vote-complete/vote-complete.module').then( m => m.VoteCompletePageModule)
  },
  {
    path: 'vote-now',
    loadChildren: () => import('./vote-now/vote-now.module').then( m => m.VoteNowPageModule)
  }
];
@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}

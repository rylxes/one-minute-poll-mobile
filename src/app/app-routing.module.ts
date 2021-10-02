import {NgModule} from '@angular/core';
import {PreloadAllModules, RouterModule, Routes} from '@angular/router';

const routes: Routes = [
  {
    path: '',
    loadChildren: () => import('./home/home.module').then(m => m.HomePageModule)
  },
  {
    path: 'home',
    loadChildren: () => import('./home/home.module').then(m => m.HomePageModule)
  },
  {
    path: 'add-new',
    loadChildren: () => import('./add-new/add-new.module').then(m => m.AddNewPageModule)
  },

  {
    path: 'help',
    loadChildren: () => import('./settings/help.module').then(m => m.HelpPageModule)
  },
  {
    path: 'my-polls',
    loadChildren: () => import('./my-polls/my-polls.module').then(m => m.MyPollsPageModule)
  },
  {
    path: 'my-profile',
    loadChildren: () => import('./my-profile/my-profile.module').then(m => m.MyProfilePageModule)
  },
  {
    path: 'poll-submitted',
    loadChildren: () => import('./poll-submitted/poll-submitted.module').then(m => m.PollSubmittedPageModule)
  },
  {
    path: 'post-review',
    loadChildren: () => import('./post-review/post-review.module').then(m => m.PostReviewPageModule)
  },
  {
    path: 'vote',
    loadChildren: () => import('./vote/vote.module').then(m => m.VotePageModule)
  },

  {
    path: 'vote-complete',
    loadChildren: () => import('./vote-complete/vote-complete.module').then(m => m.VoteCompletePageModule)
  },
  {
    path: 'vote-now/:id',
    loadChildren: () => import('./vote-now/vote-now.module').then(m => m.VoteNowPageModule)
  },
  {
    path: 'user-polls',
    loadChildren: () => import('./components/user-polls/user-polls.module').then(m => m.UserPollsPageModule)
  },
  {
    path: 'poll-search-result',
    loadChildren: () => import('./poll-search-result/poll-search-result.module').then(m => m.PollSearchResultPageModule)
  },
  {
    path: 'five-star-bar-chart',
    loadChildren: () => import('./components/five-star-bar-chart/five-star-bar-chart.module').then(m => m.FiveStarBarChartPageModule)
  },
  {
    path: 'yes-no-bar-chart',
    loadChildren: () => import('./components/yes-no-bar-chart/yes-no-bar-chart.module').then(m => m.YesNoBarChartPageModule)
  },
  {
    path: 'a2-ebar-chart',
    loadChildren: () => import('./components/a2-ebar-chart/a2-ebar-chart.module').then(m => m.A2EBarChartPageModule)
  },
  {
    path: 'poll-details/:id',
    loadChildren: () => import('./poll-details/poll-details.module').then(m => m.PollDetailsPageModule)
  },
  {
    path: 'shared-polls',
    loadChildren: () => import('./components/shared-polls/shared-polls.module').then( m => m.SharedPollsPageModule)
  },
  {
    path: 'share-success',
    loadChildren: () => import('./share-success/share-success.module').then( m => m.ShareSuccessPageModule)
  },
  {
    path: 'share-success/:id',
    loadChildren: () => import('./share-success/share-success.module').then( m => m.ShareSuccessPageModule)
  },
  {
    path: 'chart',
    loadChildren: () => import('./components/chart/chart.module').then( m => m.ChartPageModule)
  },
  {
    path: 'share-menu',
    loadChildren: () => import('./components/share-menu/share-menu.module').then( m => m.ShareMenuPageModule)
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, {preloadingStrategy: PreloadAllModules})
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {
}

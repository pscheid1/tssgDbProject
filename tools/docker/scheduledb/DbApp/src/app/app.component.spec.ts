import { async, ComponentFixture, TestBed } from '@angular/core/testing';
// import { APP_BASE_HREF } from '@angular/common';
// import { RouterModule } from '@angular/router';
// import { RouterTestingModule } from '@angular/router/testing';
// import { HttpClient, HttpHandler, HttpClientModule } from '@angular/common/http';
// import { FormsModule } from '@angular/forms';

import { AppComponent } from './app.component';

describe('AppComponent', () => {
  let appComponent: AppComponent;
  let fixture: ComponentFixture<AppComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      // imports: [
      //   RouterModule.forRoot([]),
      //   RouterTestingModule,
      //   HttpClientModule,
      //   FormsModule
      // ],
      providers: [
        AppComponent
        // HttpClient,
        // HttpHandler,
        // { provide: APP_BASE_HREF, useValue: '/' }
      ]
    });
    appComponent = TestBed.inject(AppComponent);
  }));

  it('should create the app', async(() => {
    // const app = fixture.debugElement.componentInstance;
    expect(appComponent).toBeTruthy();
  }));

  it(`should have as title 'ngTSSG'`, async(() => {
    expect(appComponent.title).toEqual('ngTSSG');
  }));

});

    //   it('should create the app', () => {
    //     const fixture = TestBed.createComponent(AppComponent);
    //     const app = fixture.debugElement.componentInstance;
    //     expect(app).toBeTruthy();
    //   });

    // it('should have `app works!` title', () => {
    //   const title = appComponent.title;
    //   expect(title).toEqual('app works!');
    // });

    // it(`should have as title 'ngTSSG'`, () => {
    //   const fixture = TestBed.createComponent(AppComponent);
    //   const app = fixture.debugElement.componentInstance;
    //   expect(app.title).toEqual('ngTSSG');
    // });

    // it('should render title in a h1 tag', () => {
    //   const fixture = TestBed.createComponent(AppComponent);
    //   fixture.detectChanges();
    //   const compiled = fixture.debugElement.nativeElement;
    //   expect(compiled.querySelector('h1').textContent).toContain('Welcome to ngTSSG!');
    // });


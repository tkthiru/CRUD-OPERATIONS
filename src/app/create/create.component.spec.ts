import { DebugElement } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatInput, MatInputModule } from '@angular/material/input';
import { BrowserModule, By } from '@angular/platform-browser';
import { CreateComponent } from './create.component';

describe('CreateComponent', () => {
  let component: CreateComponent;
  let fixture: ComponentFixture<CreateComponent>;
  let de: DebugElement;
  let el: HTMLElement;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CreateComponent],
      imports: [
        BrowserModule,
        ReactiveFormsModule,
        FormsModule
      ]
    })
      .compileComponents().then(() => {
        fixture = TestBed.createComponent(CreateComponent);
        component = fixture.componentInstance;
        de = fixture.debugElement.query(By.css('form'));
        el = de.nativeElement;
      });

    it('should create', () => {
      expect(component).toBeTruthy();
    });

    it('should set submitted to true', async(() => {
      component.onSubmit('create');
    }));

    it('should call the onSubmitted method', async(() => {
      fixture.detectChanges();
      spyOn(component, 'onSubmit');
      el = fixture.debugElement.query(By.css('button')).nativeElement;
      el.click();
      expect(component.onSubmit).toHaveBeenCalledTimes(0);
    }));

    it('form should be invalid', async(() => {
      component.createForm.controls['name'].setValue('');
      component.createForm.controls['categoryType'].setValue('');
      component.createForm.controls['description'].setValue('');
      expect(component.createForm.valid).toBeFalsy();
    }));

    it('form should be valid', async(() => {
      component.createForm.controls['name'].setValue('cinema name');
      component.createForm.controls['categoryType'].setValue('cinema');
      component.createForm.controls['description'].setValue('description');
      expect(component.createForm.valid).toBeTruthy();
    }));
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

});

import { ChangeDetectorRef, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { AbstractControl, FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ProfilePageService } from '../services/profile-page.service';
import { DatePipe } from '@angular/common';
import { Subscription } from 'rxjs';
@Component({
  selector: 'app-user-page',
  templateUrl: './user-page.component.html',
  styleUrls: ['./user-page.component.css']
})
export class UserPageComponent implements OnInit {
  submitted : boolean =  false;
  element: FormArray;
  @ViewChild('fileInput') el: ElementRef;
  imageUrl: any = 'https://i.pinimg.com/236x/d6/27/d9/d627d9cda385317de4812a4f7bd922e9--man--iron-man.jpg';
  editFile: boolean = true;
  loading: boolean = false;
  removeUpload: boolean = false;
  spinar: boolean = false;
  registrationForm: FormGroup;
  private userData:any;
  logoUrl: string | ArrayBuffer;
  subscription: Subscription;
  constructor(public fb: FormBuilder,private datePipe: DatePipe,
    private cd: ChangeDetectorRef,private service: ProfilePageService) { }

  ngOnInit(): void {
    this.initilizeForm();
    this.getUserData();
  }
 
private initilizeForm(){
  this.registrationForm = this.fb.group({
    profile_picture: [null],
    name: '',
    age: '', 
    id:null,
    Experiences: new FormArray([])
  })  
}
  
  getUserData(){
    let obj={}
    this.subscription = this.service.currentdata.subscribe(res =>{
      this.userData = res
      console.log(this.userData)
      this.imageUrl=this.userData.profile_picture;
     for(let i=0 ; i < this.userData.Experiences.length; i++){
      this.addExperiance(this.userData.Experiences[i])
     }
      this.formPopulate(this.userData)
      this.loading=true
    })
  }
  formPopulate(data?){
    this.registrationForm.patchValue({
      profile_picture:data.profile_picture,
      name:data.name,
      age:data.age,
      id:data.id
    })  
    console.log(this.Experiences.controls,data.Experiences)
  }
/*########################## File Upload ########################*/
  uploadFile(event:any,logo?) {
    let reader = new FileReader(); // HTML5 FileReader API
    let file = event.target.files[0];
    console.log(event)
    
    if (event.target.files && event.target.files[0]) {
      reader.readAsDataURL(file);
      console.log(reader)
      // When file uploads set it to file formcontrol
      reader.onload = () => {
       this.imageUrl = reader.result;
       this.loading=false;
       this.service.uploadTest({ 
        file:this.imageUrl,
         }).subscribe(res =>{
         console.log(res)
         this.registrationForm.patchValue({
          profile_picture : res['url']
        });
        this.loading=true;
       })
        
        
        this.editFile = false;
        this.removeUpload = true;
      }
      // ChangeDetectorRef since file is loading outside the zone
      this.cd.markForCheck();        
    }
   
 
    
  }
  uploadLogoFile(event:any,index) {
    let reader = new FileReader(); // HTML5 FileReader API
    let file = event.target.files[0];
    console.log(event)
    
    if (event.target.files && event.target.files[0]) {
      reader.readAsDataURL(file);
      console.log(reader)
      // When file uploads set it to file formcontrol
      reader.onload = () => {
       this.logoUrl = reader.result;
   
       this.loading=false;
    this.service.uploadTest({ 
      file:this.logoUrl,
       }).subscribe(res =>{
         console.log(res)
        this.Experiences.at(index).patchValue({img_url: res['reponse']['url']});
        this.Experiences.at(index).patchValue({public_id: res['reponse']['public_id']});
        this.loading=true;
     })
    
    // console.log(this.Experiences.controls)
      }
      
    }
   
 
    
  }
 
  // Function to remove uploaded file
  removeUploadedFile() {
    let newFileList = Array.from(this.el.nativeElement.files);
    this.imageUrl = this.userData.profile_picture;
    this.editFile = true;
    this.removeUpload = false;
    this.registrationForm.patchValue({
      profile_picture: [null]
    });
  }  
  
  // Getter method to access formcontrols
  get myForm() {
    return this.registrationForm.controls;
  }
  

  /*############### Add Dynamic Elements ###############*/
  get Experiences() {
    return this.registrationForm.get('Experiences') as FormArray
  }
 
  // Submit Registration Form
   onSubmit() {
    this.submitted = true;
    if(!this.registrationForm.valid) {
      alert('Please fill all the required fields!')
      return false;
    } else {
      console.log(this.registrationForm.value)
      this.loading=false;
      this.service.update(this.registrationForm.value).subscribe((res:any)=>{
        console.log(res)
        this.loading=true;
      })
      
    }
  }

  public endDateValidation(date,data,index){
console.log("end date",data)
  if(data.value.end_date < data.value.start_date){
    this.Experiences.at(index).patchValue({end_date:""})
    alert('Please select correct Date')
   
  }
  }
  
  public removeExperience(index){
    const controls = this.registrationForm.controls.Experiences as FormArray;
    controls.removeAt(index)
  }

  createItem(data?): FormGroup {
    if (data){
      return this.fb.group({
        job_title:[data.job_title,Validators.required],
        company: [data.company,Validators.required],
        company_log:[data.company_log],
        public_id:[data.public_id],
        img_url:[data.img_url],
        job_description:[data.job_description, Validators.required],
        start_date:[this.datePipe.transform(data.start_date, 'yyyy-MM-dd'),Validators.required],
        end_date: this.datePipe.transform(data.end_date, 'yyyy-MM-dd'),
        user_id:data.user_id,
      });
    }
    else{
      return this.fb.group({
        job_title: ["",Validators.required],
        company:["",Validators.required],
        company_log:[null],
        public_id:['',],
        img_url:['',],
        job_description:["",Validators.required], 
        start_date: ["",Validators.required],
        end_date: "",
        user_id:this.userData.id
      });
    }
   
  }
  
  addExperiance(data?): void {
    if (data){
      this.element = this.registrationForm.get('Experiences') as FormArray;
      this.element.push(this.createItem(data));
    }else{
      this.element = this.registrationForm.get('Experiences') as FormArray;
      this.element.push(this.createItem());
    }
    
  }

}

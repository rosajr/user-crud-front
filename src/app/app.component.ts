import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { UserService } from './services/user.service'
import { ZipCodeService } from './services/zipcode.service'

interface CepInfo {
  bairro: string
  cep: string
  complemento: string
  ddd: string
  gia: string
  ibge: string
  localidade: string
  logradouro: string
  siafi: string
  uf: string
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  userControl: FormGroup
  cityIbge: string
  constructor(
    private userService: UserService,
    private cepService: ZipCodeService
  ) { }

  ngOnInit() {
    this.userControl = new FormGroup({
      name: new FormControl('', [Validators.required]),
      email: new FormControl('', [Validators.required]),
      phone: new FormControl('', [Validators.required]),
      cpf: new FormControl('', [Validators.required]),
      zipCode: new FormControl('', [Validators.required]),
      password: new FormControl('', [Validators.required]),
      repeatPassword: new FormControl('', [Validators.required]),
      street: new FormControl('', [Validators.required]),
      number: new FormControl('', [Validators.required]),
      complement: new FormControl('', [Validators.required]),
      neighborhood: new FormControl('', [Validators.required]),
      city: new FormControl('', [Validators.required]),
    })
  }

  getFormValue() {
    this.userControl.getRawValue()
  }

  fillUser() {
    const { 
      zipCode, 
      street,
      number, 
      complement, 
      neighborhood,
      city, 
      ...userInfo 
    } = this.userControl.getRawValue()

    return {
      ...userInfo,
      address: {
        zipCode, 
        street,
        number: Number(number), 
        complement, 
        neighborhood,
        cityIbge: Number(this.cityIbge)
      }
    }
  }

  save() {
    this.userService.save(this.fillUser()).subscribe(() => {
      console.log('salvo com sucesso')
    })
  }

  getCep() {
    const cep = this.userControl.get('zipCode').value
    this.cepService.getCep(cep).subscribe((response: CepInfo) => {
      this.fillLocationValue(response);
    })
  }

  fillLocationValue(cep: CepInfo) {
    this.userControl.patchValue({
      street: cep.logradouro,
      neighborhood: cep.bairro,
      city: cep.localidade + ' - ' + cep.uf
    })
    this.cityIbge = cep.ibge
  }
}

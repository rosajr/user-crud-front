import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { UserService } from '../services/user.service'
import { ZipCodeService } from '../services/zipcode.service'

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
  selector: 'app-user-register',
  templateUrl: './user-register.component.html',
  styleUrls: ['./user-register.component.css']
})

export class UserRegisterComponent implements OnInit {
  formControl: FormGroup = new FormGroup({
    name: new FormControl('', [Validators.required]),
    email: new FormControl('', [Validators.required]),
    phone: new FormControl('', [Validators.required]),
    cpf: new FormControl('', [Validators.required]),
    zipCode: new FormControl('', [Validators.required]),
    password: new FormControl('', [Validators.required]),
    street: new FormControl('', [Validators.required]),
    number: new FormControl('', [Validators.required]),
    complement: new FormControl('', [Validators.required]),
    neighborhood: new FormControl('', [Validators.required]),
    city: new FormControl('', [Validators.required]),
  })
  cityIbge: string
  constructor(
    private userService: UserService,
    private cepService: ZipCodeService,
    private route: Router,
    private activatedRoute: ActivatedRoute
  ) { }

  ngOnInit() {
    if (this.activatedRoute.snapshot.params['id'])
      this.getUserById(this.activatedRoute.snapshot.params['id'])

  }

  getUserById(id:number) {
    this.userService.getById(id).subscribe((response) => {
      this.fillForm(response);
    })
  }

  fillForm(user) {
    this.formControl.patchValue({
      name:user.name,
      email: user.email,
      phone: user.phone,
      cpf: user.cpf,
      street: user.address.street,
      neighborhood: user.address.neighborhood,
      city: user.address.city.name + ' - ' + user.address.city.state.uf,
      zipCode: user.address.zipCode,
      number: user.address.number,
      complement: user.address.complement

    })
    this.cityIbge = user.address.city.codeIbge
  }

  getFormValue() {
    this.formControl.getRawValue()
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
    } = this.formControl.getRawValue()

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
    if (!this.formControl.invalid) {
      this.userService.save(this.fillUser()).subscribe(() => {
        this.route.navigate([''])
        console.log('salvo com sucesso')
      })
    }
  }

  getCep() {
    const cep = this.formControl.get('zipCode').value
    this.cepService.getCep(cep).subscribe((response: CepInfo) => {
      this.fillLocationValue(response);
    })
  }

  fillLocationValue(cep: CepInfo) {
    this.formControl.patchValue({
      street: cep.logradouro,
      neighborhood: cep.bairro,
      city: cep.localidade + ' - ' + cep.uf
    })
    this.cityIbge = cep.ibge
  }
}

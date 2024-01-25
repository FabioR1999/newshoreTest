import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ApiService } from '../../services/api.service';
import { Flight } from '../../models/flight';
import { Journey } from '../../models/journey';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { CurrencyService } from '../../services/currency.service';
import { BtnNewConsultComponent } from '../btn-new-consult/btn-new-consult.component';
import Swal from 'sweetalert2';



@Component({
  selector: 'app-form',
  standalone: true,
  imports: [FormsModule, CommonModule, BtnNewConsultComponent],
  templateUrl: './form.component.html',
  styleUrl: './form.component.css'
})
export class FormComponent implements OnInit {
  inputOrigin: string = '';
  inputDestination: string = '';
  journeysList: Journey[] = [];
  selectedCurrency : string = 'USD';
  inputOriginErrorMessage : string = '';
  inputDestinationErrorMessage : string = '';
  isInputOriginDisabled : Boolean = true;
  isInputDestinationDisabled : Boolean = true;
  hasUserStartedTyping: boolean = false;
  isButtonDisabled: boolean = true;

  // Variable para mantener el vuelo seleccionado por el usuario
  flightSelect: any;

  constructor(
    public api: ApiService,
    public exchangeApi: CurrencyService
  ) {}


  ngOnInit(): void {
    this.api.getApiResponse();
  }

  searchJourney() {
    let originFound = false;
    let destinationFound = false;

    this.api.flights.forEach((element) => {
      if (element.departureStation == this.inputOrigin) {
        originFound = true;
      }

      if (element.arrivalStation == this.inputDestination) {
        destinationFound = true;
      }
    });

    if (!originFound || !destinationFound) {
      // alert('Origen/Destino no encontrado');
      Swal.fire({
        icon: 'error',
        title: 'Origen / Destino no encontrado',
      }).then(() => {
        this.inputOrigin = '';
        this.inputDestination = '';
      });
      return;
    }

    this.journeysList = this.searchRoute();

    if(this.journeysList.length == 0){
      // alert('Ruta no encontrada');
      Swal.fire({
        icon: 'error',
        title: 'Ruta no encontrada',
        customClass: {
          confirmButton: 'swal-custom-button-class', // Clase CSS personalizada para el botón
        },
      }).then(() => {
        this.inputOrigin = '';
        this.inputDestination = '';
      });
    }
  }

  searchRoute() : Journey[]{
    let list = [];

    // Recorre el arreglo global
    for (const flight1 of this.api.flights) {

      // Compara si el inputOrigin coincide con el origen de flight1
      if (flight1.departureStation == this.inputOrigin) {

         // Si el inputDestination coincide con el destino de flight1, lo imprime (ruta directa)
        if (flight1.arrivalStation == this.inputDestination) {
          let journey = this.populateJourney(flight1);
          list.push(journey);
          // alert('Vuelo directo encontrado');
        }

        // Acá empieza a buscar vuelos con al menos una escala
        for (const flight2 of this.api.flights) {
          if (flight2.arrivalStation == this.inputOrigin) {
            continue;
          }

          if (flight1.arrivalStation == flight2.departureStation) {
            if (flight2.arrivalStation == this.inputDestination) {
              let journey = this.populateJourney(flight1, flight2);
              list.push(journey);
            }

            // Acá empieza a buscar vuelos con al menos dos escalas
            for (const flight3 of this.api.flights) {
              if (
                flight3.arrivalStation == this.inputOrigin ||
                flight3.arrivalStation == flight2.departureStation
              ) {
                continue;
              }

              if (flight2.arrivalStation == flight3.departureStation) {
                if (flight3.arrivalStation == this.inputDestination) {
                  let journey = this.populateJourney(
                    flight1,
                    flight2,
                    flight3
                  );

                  list.push(journey);
                }

                // Acá empieza a buscar vuelos con al menos tres escalas
                for (const flight4 of this.api.flights) {
                  if (
                    flight4.arrivalStation == this.inputOrigin ||
                    flight4.arrivalStation == flight2.departureStation ||
                    flight4.arrivalStation == flight3.departureStation
                  ) {
                    continue;
                  }

                  if (flight3.arrivalStation == flight4.departureStation) {
                    if (flight4.arrivalStation == this.inputDestination) {
                      let journey = this.populateJourney(
                        flight1,
                        flight2,
                        flight3,
                        flight4
                      );
                      list.push(journey);
                    }

                    // Acá empieza a buscar vuelos con al menos cuatro escalas
                    for (const flight5 of this.api.flights) {
                      if (
                        flight5.arrivalStation == this.inputOrigin ||
                        flight5.arrivalStation == flight2.departureStation ||
                        flight5.arrivalStation == flight3.departureStation ||
                        flight5.arrivalStation == flight4.departureStation
                      ) {
                        continue;
                      }

                      if (
                        flight4.arrivalStation == flight5.departureStation
                      ) {
                        if (flight5.arrivalStation == this.inputDestination) {
                          let journey = this.populateJourney(
                            flight1,
                            flight2,
                            flight3,
                            flight4,
                            flight5
                          );
                          list.push(journey);
                        }
                      }
                    }
                  }
                }
              }
            }
          }
        }
      }
    }

    return list;
  }

  populateJourney(...elements: Flight[]) : Journey {
    let journey = new Journey();
    journey.origin = this.inputOrigin;
    journey.destination = this.inputDestination;
    journey.price = 0;
    journey.flights = [];

    for (const e of elements) {
      journey.flights.push(e);
      journey.price += e.price;
    }

    return journey;
  }

  exchangeRate(capturedValue: string) {
  this.exchangeApi.getCurrency(capturedValue).subscribe(
    () => {
      this.selectedCurrency = capturedValue;
    },
    (error) => {
      console.error('Error al obtener la tasa de cambio:', error);
    }
  );
}

  onInputChange() {
    this.inputOrigin = this.inputOrigin.toUpperCase();
    this.inputDestination = this.inputDestination.toUpperCase();

    if (this.inputOrigin === this.inputDestination) {
      Swal.fire({
        icon: 'error',
        title: 'Los valores no pueden ser iguales',
      }).then(() => {
        this.inputOrigin = '';
        this.inputDestination = '';
      });
    }

    const isOriginValid = this.inputOrigin.length === 3;
    const isDestinationValid = this.inputDestination.length === 3;

    // Actualiza la bandera cuando el usuario comienza a escribir
    this.hasUserStartedTyping = true;

    if (isOriginValid) {
      this.isInputDestinationDisabled = false;
      this.isButtonDisabled = true;
      this.inputOriginErrorMessage = '';  // Reinicia el mensaje de error si el primer campo es válido
    } else {
      this.isInputDestinationDisabled = true;
      this.isButtonDisabled = true;
      this.inputDestination = '';
      this.inputOriginErrorMessage = '*El campo origen es obligatorio y debe tener 3 caracteres.';
    }

    if (isDestinationValid && this.hasUserStartedTyping) {
      this.isButtonDisabled = false;
      this.inputDestinationErrorMessage = '';  // Reinicia el mensaje de error si el segundo campo es válido y el usuario ha empezado a escribir
    } else {
      this.inputDestinationErrorMessage = '*El campo destino es obligatorio y debe tener 3 caracteres.';
    }


  }

  // Función para manejar el clic en una tarjeta de vuelo
  onCardClick(flight: any) {
    this.flightSelect = flight;
  }

  public getEscalasText(flight: any): string {
    return flight.flights.length - 1 > 0 ? `Escalas: <strong>${flight.flights.length - 1}</strong>` : '<strong>DIRECTO</strong>';
  }
}

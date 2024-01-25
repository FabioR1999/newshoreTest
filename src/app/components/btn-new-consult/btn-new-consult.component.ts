import { Component } from '@angular/core';

@Component({
  selector: 'app-btn-new-consult',
  standalone: true,
  imports: [],
  templateUrl: './btn-new-consult.component.html',
  styleUrl: './btn-new-consult.component.css'
})
export class BtnNewConsultComponent {
  reloadPage() {
    window.location.reload();
  }
}

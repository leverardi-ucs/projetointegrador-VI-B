
import { Component } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { IonIcon } from '@ionic/angular';
import { addIcons } from 'ionicons';
import {
  checkmarkOutline,
  calendarOutline,
  statsChartOutline,
  peopleOutline
} from 'ionicons/icons';

@Component({
  selector: 'app-navegacao',
  standalone: true,
  imports: [RouterLink, RouterLinkActive, IonIcon],
  templateUrl: './navegacao.component.html',
  styleUrls: ['./navegacao.component.scss']
})
export class NavegacaoComponent {
  constructor() {
    addIcons({
      checkmarkOutline,
      calendarOutline,
      statsChartOutline,
      peopleOutline
    });
  }
}

import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule }    from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { InicioComponent } from './inicio/inicio.component';

// Modulos de primeng
import { DialogModule } from 'primeng/dialog';
import { ButtonModule } from 'primeng/button';
import { MessagesModule } from 'primeng/messages';
import { TooltipModule } from 'primeng/tooltip';
import { CalendarModule } from 'primeng/calendar';
import { DropdownModule } from 'primeng/dropdown';
import { RadioButtonModule } from 'primeng/radiobutton';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { InputTextModule } from 'primeng/inputtext';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { ConfirmationService } from 'primeng/api';
import { ToolbarModule } from 'primeng/toolbar';
import { ScrollPanelModule } from 'primeng/scrollpanel';
import { InputSwitchModule } from 'primeng/inputswitch';
import { TableModule } from 'primeng/table';
import { SelectButtonModule } from 'primeng/selectbutton';
import { ProgressBarModule } from 'primeng/progressbar';
import { TieredMenuModule } from 'primeng/tieredmenu';
import {AccordionModule} from 'primeng/accordion';
import {SliderModule} from 'primeng/slider';
import {ToggleButtonModule} from 'primeng/togglebutton';
import { FutmondoService } from './services/futmondo.service';
import { HttpClientModule } from '@angular/common/http';
import {CheckboxModule} from 'primeng/checkbox';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { registerLocaleData } from '@angular/common';
import localeEs from '@angular/common/locales/es'; // to register french
registerLocaleData(localeEs);

// Libreria moment
import { MomentModule } from 'ngx-moment';

@NgModule({
  declarations: [
    AppComponent,
    InicioComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    CommonModule,
    FormsModule,
    HttpClientModule,
    AppRoutingModule,
    MomentModule,
    DialogModule,
    ButtonModule,
    MessagesModule,
    TooltipModule,
    CalendarModule,
    DropdownModule,
    RadioButtonModule,
    InputTextModule,
    InputTextareaModule,
    CheckboxModule,
    ConfirmDialogModule,
    ToolbarModule,
    ScrollPanelModule,
    InputSwitchModule,
    TableModule,
    SelectButtonModule,
    ProgressBarModule,
    TieredMenuModule,
    AccordionModule,
    SliderModule,
    ToggleButtonModule
  ],
  providers: [ConfirmationService,
    FutmondoService],
  bootstrap: [AppComponent]
})
export class AppModule { }

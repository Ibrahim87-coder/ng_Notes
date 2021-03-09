import { Component, Input, OnInit, Output, Renderer2 ,EventEmitter} from '@angular/core';


@Component({
  selector: 'app-note-card',
  templateUrl: './note-card.component.html',
  styleUrls: ['./note-card.component.scss']
})
export class NoteCardComponent implements OnInit {

  @Input() title :string;
  @Input() body :string;
   @Input() link :string;

   @Output('delete') deleteEvent: EventEmitter<void>= new EventEmitter<void>();

  constructor(private renderer: Renderer2) { }


  ngOnInit(): void {
  

  }
  onXButtonClick(){
    this.deleteEvent.emit();
  }
}

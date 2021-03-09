import { animate, query, stagger, style, transition,trigger } from '@angular/animations';

import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Note } from 'src/app/shared/note.model';
import { NotesService } from 'src/app/shared/notes.service';

@Component({
  selector: 'app-notes-list',
  templateUrl: './notes-list.component.html',
  styleUrls: ['./notes-list.component.scss'],
  animations:[
    trigger('itemAnim',[
      transition('void=>*',[
        style({
          height:0,
          opacity:0,
          transform:'scale(0.85)',
          'margin-bottom':0,
          paddingTop:0,
          paddingBottom:0,
          paddingRight:0,          
          paddingLeft:0
        }),
        animate('50ms',style({
          height:'*',
          'margin-bottom':'*',
          paddingBottom:'*',
          paddingTop:'*',
          paddingRight:'*',
          paddingLeft:'*',
          
        })),
        animate(68)
      ]),
      transition('* => void',[

        animate(50,style({
          transform:'scale(1.05)'
        })),
        animate(50,style({
          transform:'scale(1)',
          opacity:0.75
        })),
        animate('120ms ease-out',style({
          transform:'scale(0.68)',
          opacity:0
        })),
        animate('150ms ease-out',style({
          height:0,
          
          paddingTop:0,
          paddingBottom:0,
          paddingRight:0,          
          paddingLeft:0,
            
          'margin-bottom':0
        }))
      ])
    ]),
    trigger('listAnim',[
      transition('*=>*',[
        query(':enter',[
          style({
            opacity:0,
            height:0,

          }),
          stagger(100,[
            animate('0.2s ease')
          ])
        ],{
        optional:true
        })
      ])
    ])
  ]
})
export class NotesListComponent implements OnInit {



  notes:Note[]= new Array<Note>();

  filteredNotes:Note[]=new Array<Note>();
  @ViewChild('filterInput') filterInputElRef: ElementRef<HTMLInputElement>

  constructor(private noteServices: NotesService) { }

  ngOnInit(): void {
    // we want to retrieve all notes
    this.notes = this.noteServices.getAll();
    this.filter('');
  }


  deleteNote(note:Note){
    let noteId= this.noteServices.getId(note);
    this.noteServices.delete(noteId);

    this.filter(this.filterInputElRef.nativeElement.value);

  }
  generateNoteURL(note:Note){
    let noteId= this.noteServices.getId(note);
    return noteId;

  }

  filter(query:string){
    query=query.toLowerCase().trim();
    
    let terms: string[] = query.split(' ');

    terms= this.removeDuplicates(terms);

    let allResults:Note[] = new Array<Note>();

    terms.forEach(term=>{
      let results:Note[] = this.relevantNotes(term);
      allResults=[...allResults,...results]
    });
    
    let uniqueResults = this.removeDuplicates(allResults);
    this.filteredNotes=uniqueResults;

    this.sortByRelevancy(allResults);
  }

  removeDuplicates(arr:Array<any>):Array<any>{
    let uniqueResults: Set<any> = new Set<any>();
    arr.forEach(e=>uniqueResults.add(e));

    return Array.from(uniqueResults);
  }

  relevantNotes(query:string):Array<Note>{
    query=query.toLowerCase().trim();
    let relevantNotes = this.notes.filter(note=>{
      if(note.title &&note.title.toLowerCase().includes(query))
      {
        return true;
      }
      if(note.body&&note.body.toLowerCase().includes(query)){
        return true;
      }
      return false;
    })

    return relevantNotes;
  }

  sortByRelevancy(searchResults: Note[]){
    
    let noteCountObj: Object={};

    searchResults.forEach(note=>{
      let noteId = this.noteServices.getId(note);
      if(noteCountObj[noteId]){
        noteCountObj[noteId]++;
      }else{
        noteCountObj[noteId]=1;
      }
    })

    this.filteredNotes = this.filteredNotes.sort((a:Note,b:Note)=>{
      let aId = this.noteServices.getId(a);
      let bId = this.noteServices.getId(b);

      let aCount = noteCountObj[aId];
      let bCount = noteCountObj[bId];
    
      return bCount-aCount;
    })


  }
  
}

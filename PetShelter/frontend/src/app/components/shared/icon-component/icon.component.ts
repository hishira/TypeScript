import { AfterViewInit, Component, ElementRef, Input, OnInit, ViewChild } from "@angular/core";
import { Icons, IconsValues } from "src/app/models/icons.model";

@Component({
    selector: 'app-icon',
    styleUrls: ['./icon.component.scss'],
    templateUrl: './icon.component.html'
})
export class IconComponent implements OnInit {
    
    @Input() height?: number = 0;
    @Input() iconType: Icons;
    @Input() width?: number = 0;
    //@ViewChild('svgPath') svgPath: ElementRef;
    iconvalue: string = ''
    
    readonly vieBoxValue: string =  "0 0 57 512";
    
    constructor(){
        
    }

    ngOnInit(): void {
        this.iconvalue = IconsValues[this.iconType]
    }
    
}
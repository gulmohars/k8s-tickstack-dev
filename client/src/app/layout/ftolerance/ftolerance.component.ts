import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { first } from 'rxjs/operators';
import { DataService } from '../../shared/services/data';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';

@Component({
    selector: 'app-ftolerance',
    templateUrl: './ftolerance.component.html',
    styleUrls: ['./ftolerance.component.scss']
})
export class FtoleranceComponent implements OnInit {

    title: string = 'AGM';
    lat: number = 41.2607;
    lng: number = -95.9437;
    zoom: number = 1;
    data: any = [];
    markerArray: any = [];
    locationArray: any;
    myForm:any;
    loadingContent:boolean = false;

    public customStyle = [
        {
            "featureType": "administrative",
            "elementType": "geometry.fill",
            "stylers": [
                {
                    "visibility": "off"
                }
            ]
        },
        {
            "featureType": "administrative",
            "elementType": "labels.text",
            "stylers": [
                {
                    "visibility": "on"
                },
                {
                    "color": "#8e8e8e"
                }
            ]
        },
        {
            "featureType": "administrative",
            "elementType": "labels.text.fill",
            "stylers": [
                {
                    "color": "#7f7f7f"
                }
            ]
        },
        {
            "featureType": "administrative",
            "elementType": "labels.text.stroke",
            "stylers": [
                {
                    "visibility": "off"
                }
            ]
        },
        {
            "featureType": "administrative.country",
            "elementType": "geometry.stroke",
            "stylers": [
                {
                    "color": "#bebebe"
                }
            ]
        },
        {
            "featureType": "administrative.province",
            "elementType": "geometry.stroke",
            "stylers": [
                {
                    "visibility": "on"
                },
                {
                    "color": "#cbcbcb"
                },
                {
                    "weight": "0.69"
                }
            ]
        },
        {
            "featureType": "administrative.locality",
            "elementType": "geometry",
            "stylers": [
                {
                    "visibility": "simplified"
                }
            ]
        },
        {
            "featureType": "landscape",
            "elementType": "all",
            "stylers": [
                {
                    "color": "#ffffff"
                },
                {
                    "saturation": "0"
                }
            ]
        },
        {
            "featureType": "poi.attraction",
            "elementType": "all",
            "stylers": [
                {
                    "visibility": "on"
                },
                {
                    "color": "#ffffff"
                },
                {
                    "saturation": "0"
                }
            ]
        },
        {
            "featureType": "poi.attraction",
            "elementType": "labels",
            "stylers": [
                {
                    "visibility": "off"
                }
            ]
        },
        {
            "featureType": "poi.business",
            "elementType": "all",
            "stylers": [
                {
                    "visibility": "off"
                }
            ]
        },
        {
            "featureType": "poi.government",
            "elementType": "all",
            "stylers": [
                {
                    "visibility": "off"
                }
            ]
        },
        {
            "featureType": "poi.medical",
            "elementType": "all",
            "stylers": [
                {
                    "visibility": "off"
                }
            ]
        },
        {
            "featureType": "poi.park",
            "elementType": "geometry.fill",
            "stylers": [
                {
                    "color": "#98da9f"
                },
                {
                    "visibility": "on"
                }
            ]
        },
        {
            "featureType": "poi.park",
            "elementType": "labels",
            "stylers": [
                {
                    "visibility": "off"
                }
            ]
        },
        {
            "featureType": "poi.place_of_worship",
            "elementType": "all",
            "stylers": [
                {
                    "visibility": "off"
                }
            ]
        },
        {
            "featureType": "poi.school",
            "elementType": "all",
            "stylers": [
                {
                    "visibility": "off"
                }
            ]
        },
        {
            "featureType": "poi.sports_complex",
            "elementType": "all",
            "stylers": [
                {
                    "visibility": "off"
                }
            ]
        },
        {
            "featureType": "poi.sports_complex",
            "elementType": "labels",
            "stylers": [
                {
                    "visibility": "off"
                }
            ]
        },
        {
            "featureType": "poi.sports_complex",
            "elementType": "labels.text",
            "stylers": [
                {
                    "visibility": "off"
                }
            ]
        },
        {
            "featureType": "road",
            "elementType": "all",
            "stylers": [
                {
                    "saturation": "-100"
                },
                {
                    "lightness": "50"
                },
                {
                    "gamma": "1"
                }
            ]
        },
        {
            "featureType": "road",
            "elementType": "geometry.fill",
            "stylers": [
                {
                    "color": "#e4e4e4"
                },
                {
                    "saturation": "0"
                }
            ]
        },
        {
            "featureType": "road.highway",
            "elementType": "all",
            "stylers": [
                {
                    "visibility": "simplified"
                },
                {
                    "saturation": "0"
                }
            ]
        },
        {
            "featureType": "road.highway",
            "elementType": "geometry",
            "stylers": [
                {
                    "color": "#f2f2f2"
                },
                {
                    "saturation": "0"
                }
            ]
        },
        {
            "featureType": "road.highway",
            "elementType": "labels",
            "stylers": [
                {
                    "visibility": "off"
                }
            ]
        },
        {
            "featureType": "road.highway",
            "elementType": "labels.text",
            "stylers": [
                {
                    "visibility": "simplified"
                }
            ]
        },
        {
            "featureType": "road.arterial",
            "elementType": "all",
            "stylers": [
                {
                    "saturation": "0"
                }
            ]
        },
        {
            "featureType": "road.arterial",
            "elementType": "labels.text",
            "stylers": [
                {
                    "visibility": "simplified"
                }
            ]
        },
        {
            "featureType": "road.arterial",
            "elementType": "labels.icon",
            "stylers": [
                {
                    "visibility": "off"
                }
            ]
        },
        {
            "featureType": "road.local",
            "elementType": "all",
            "stylers": [
                {
                    "visibility": "simplified"
                }
            ]
        },
        {
            "featureType": "road.local",
            "elementType": "geometry",
            "stylers": [
                {
                    "color": "#e4e4e4"
                },
                {
                    "lightness": "0"
                },
                {
                    "gamma": "1"
                },
                {
                    "saturation": "0"
                }
            ]
        },
        {
            "featureType": "road.local",
            "elementType": "labels.text",
            "stylers": [
                {
                    "visibility": "simplified"
                }
            ]
        },
        {
            "featureType": "transit",
            "elementType": "all",
            "stylers": [
                {
                    "visibility": "on"
                }
            ]
        },
        {
            "featureType": "transit",
            "elementType": "labels",
            "stylers": [
                {
                    "hue": "#ff0000"
                },
                {
                    "saturation": "-100"
                },
                {
                    "visibility": "simplified"
                }
            ]
        },
        {
            "featureType": "water",
            "elementType": "all",
            "stylers": [
                {
                    "color": "#cbcbcb"
                },
                {
                    "visibility": "on"
                }
            ]
        },
        {
            "featureType": "water",
            "elementType": "geometry.fill",
            "stylers": [
                {
                    "color": "#f3f3f3"
                },
                {
                    "saturation": "0"
                }
            ]
        },
        {
            "featureType": "water",
            "elementType": "labels",
            "stylers": [
                {
                    "visibility": "off"
                }
            ]
        },
        {
            "featureType": "water",
            "elementType": "labels.text",
            "stylers": [
                {
                    "visibility": "simplified"
                }
            ]
        }
    ];
    
    constructor(private dataService: DataService, private _fb: FormBuilder) { }

    ngOnInit() {
        //this.loadAllData();
        this.getLocations();
        this.myForm = this._fb.group({
            location:''
        });
    }

    private loadAllData() {
        this.markerArray.push({})
        this.dataService.getAll().pipe(first()).subscribe(data => {
            this.markerArray = data;
        });
    }

    private getLocations() {
        this.locationArray = {};
        this.dataService.getLOcations().pipe(first()).subscribe(data => {
            this.locationArray = data;
        });
    }

    public getDataForLocation(location:any) {
        this.markerArray.push({})
        this.loadingContent = true;
        this.dataService.getDataForLocation(location).pipe(first()).subscribe(data => {
            this.markerArray = data;
            this.loadingContent = false;
        });
    }

    public clickedMarker(time: any) {
        this.dataService.getInfo(time).subscribe(data => {
            this.data = data;
        });
    }
}

interface marker {
    animation: 'DROP' | 'BOUNCE' | '',
    lat: number,
    lng: number
}
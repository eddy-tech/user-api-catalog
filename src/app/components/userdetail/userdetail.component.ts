import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import * as Leaflet from 'leaflet';
import {Coordinate} from 'src/app/interfaces/coordinate';
import {Response} from 'src/app/interfaces/response';
import {User} from 'src/app/interfaces/user';
import {UserService} from 'src/app/services/user.service';

@Component({
  selector: 'app-userdetail',
  templateUrl: './userdetail.component.html',
  styleUrls: ['./userdetail.component.css']
})
export class UserdetailComponent implements OnInit {
  userRoot : string = "/users";
  response: Response;
  user: User;
  mode: 'edit' | 'locked' = 'locked';
  buttonText: 'Edit' | 'Save Changes' = 'Edit';
  marker = new Leaflet.Icon({
    iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-icon.png',
    iconSize: [32, 41],
    iconAnchor: [12, 41],
    popupAnchor: [1, -34],
    shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png',
    shadowSize: [41, 41]
  });

  constructor(private activateRoute: ActivatedRoute, private userService: UserService) {}

  ngOnInit(): void {
    this.user = (<User>(this.activateRoute.snapshot.data['resolvedResponse'].results[0]));
    console.log(this.user);
    this.loadMap(this.user.coordinate);
    // this.activateRoute.paramMap.subscribe((params: ParamMap) => {
    //   this.userService.getUser(params.get('uuid')!).subscribe({
    //     next: (data: any) => {
    //       console.log(data);
    //       this.response = data;
    //     }
    //   })
    // })
  }

  changeMode(mode: 'edit' | 'locked'): void {
    console.log(mode);
    this.mode = this.mode === 'locked' ? 'edit' : 'locked';
    this.buttonText = this.buttonText === 'Edit' ? 'Save Changes' : 'Edit';

    if(mode === 'edit') {
      // Update the user on the backend
      console.log('Updatibng using on the back end');

    }
  }

  private loadMap(coordinate: Coordinate): void {
    const map = Leaflet.map('map', {
      center: [coordinate.latitude, coordinate.longitude],
      zoom: 8
    });
    const mainLayer = Leaflet.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      tileSize: 512,
      zoomOffset: -1,
      minZoom: 1,
      maxZoom: 30,
      crossOrigin: true,
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    });
    mainLayer.addTo(map);
    const marker = Leaflet.marker([coordinate.latitude, coordinate.longitude], { icon: this.marker});
    marker.addTo(map).bindPopup(`${this.user.firstName}'s Location`).openPopup();
  }

}

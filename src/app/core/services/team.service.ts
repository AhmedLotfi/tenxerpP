import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { TeamMember } from '../models/team.model';

@Injectable({ providedIn: 'root' })
export class TeamService {
  private readonly http = inject(HttpClient);

  list(): Observable<TeamMember[]> {
    return this.http.get<TeamMember[]>('/api/team');
  }
}

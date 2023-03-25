import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { Observable } from 'rxjs';
import { GroupService } from 'src/services/group.service';

@Injectable()
export class GroupGuard implements CanActivate {
  constructor(private readonly groupService: GroupService) {}
  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const request = context.switchToHttp().getRequest();
    const body = request.body;
    return this.groupService.checkIfexists(body.groupid).then((_) => true);
  }
}

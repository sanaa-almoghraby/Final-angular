import { CanActivateFn, Router } from '@angular/router';

export const authorizationGuard: CanActivateFn = (route , state) => {

  const router:Router = new Router();

  console.log(state);

  const token = localStorage.getItem('token');

  if(token)
  {
    if(state.url.includes('admin'))   
    {
      let user:any = localStorage.getItem('user');
      user = JSON.parse(user);
      if(user.role == 1)
      {
        return true;
      }
      else
      {
        alert('you dont have permission')
        router.navigate(['security/login']);
        return false;
      }
    }
    return true;
  }
  else
  {
    alert('you dont have permission')
        router.navigate(['security/login']);
  return false
  }
  
};
/* global fetch */

class APICall {
  processReturn(result, callback) {
    result = JSON.stringify(result);
    result = result.replace(/'+/g,"'");
    result = result.replace(/--and--+/g,"&");
    result = JSON.parse(result);
    callback(result);
  }
  

  command( callback, method, postData) {
    let baseurl = 'https://writing-7l47qrab3q-uc.a.run.app/story/story-generator'
    let final_url = baseurl
    if(method === 'POST') {
      fetch(final_url, {method: 'POST',  headers: {
        'Content-Type': 'application/json', 
        'Accept' : 'application/json', 
        'Connection':'keep-alive',
        'Token':'eyJhbGciOiJSUzI1NiIsImtpZCI6IjY5NjI5NzU5NmJiNWQ4N2NjOTc2Y2E2YmY0Mzc3NGE3YWE5OTMxMjkiLCJ0eXAiOiJKV1QifQ.eyJwcm92aWRlcl9pZCI6ImFub255bW91cyIsImlzcyI6Imh0dHBzOi8vc2VjdXJldG9rZW4uZ29vZ2xlLmNvbS93ZWItdHRvb29scyIsImF1ZCI6IndlYi10dG9vb2xzIiwiYXV0aF90aW1lIjoxNzA3MDM3NjE5LCJ1c2VyX2lkIjoiRGozd0JyaHlCcGR2b3Nva1owUkZCalNOSWh3MSIsInN1YiI6IkRqM3dCcmh5QnBkdm9zb2taMFJGQmpTTklodzEiLCJpYXQiOjE3MDcwMzc2MTksImV4cCI6MTcwNzA0MTIxOSwiZmlyZWJhc2UiOnsiaWRlbnRpdGllcyI6e30sInNpZ25faW5fcHJvdmlkZXIiOiJhbm9ueW1vdXMifX0.Ey8yAQC8Wiwis1ld4YSIx8JadZQvChLMqgRCsKiaax59mjk3n_f5jjo-7Zs0JczWAfEkwsJQu_UcMXwARr6H_6QE3dV95S49kl0H00Fvj6U1NNGGDB7r8PCgTGVXaFBDMWcAGYpARzTKReLuRdGjO0VnmDZs0EP-USm8m_-BWWWE7qnbHybe5SbeVNZvvIHtUJ7oTeXcLh4vBCeyWbx_xX1109yUvqx9p8axMnsa18QsK2qLUSX3qe5QLCL-w7O7IOziKsaKhswiOeM0ID9Jk1_H54J3jkL6OgrBxWghqnewjSwddfVUHSg_vDG2IQls_ij041Jk7Se7i3y1hHnBNQ',
        'App_check_token':'eyJraWQiOiJYcEhKU0EiLCJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJzdWIiOiIxOjM1ODcwMDM3NzU0Mjp3ZWI6OTAwZjM1ODE0NWE3YWEwNmQxM2VjNyIsImF1ZCI6WyJwcm9qZWN0c1wvMzU4NzAwMzc3NTQyIiwicHJvamVjdHNcL3dlYi10dG9vb2xzIl0sInByb3ZpZGVyIjoicmVjYXB0Y2hhX3YzIiwiaXNzIjoiaHR0cHM6XC9cL2ZpcmViYXNlYXBwY2hlY2suZ29vZ2xlYXBpcy5jb21cLzM1ODcwMDM3NzU0MiIsImV4cCI6MTcwNzEyNDAyMCwiaWF0IjoxNzA3MDM3NjIwLCJqdGkiOiJkWlRCaVNYbWNJbG95eDQ3U3h4TG1BZ2doMzhkWExTZ2RGbWJaVGJxT3pnIn0.WXwHegLvHLobeaEUn7WsTZvuxTWGwhYmthbVEIy5ijLBkoecK0kk_K-u1biIMF-MeL-xB2uNocJn8GIJvXGIOaxnoyTGqQdVSopyRYMRDDax3EgMXES6QfBTq9SMEYj_15qRWZN4zxfunzuSEYOwEyF7kNU2m-RVXfBvLEWXnc3J62ggwSCqodTDxHXHyRmAnvgt-d6sGohrPyphDhKmlVIi-soCmiyp3ErTezPhd_HTofjifP9UfllAGWae-wW4Wpx7BQZtXexnyU6clfxVaHyPF8YSFPVnwr7WB2z0HEO9B3hjvYPgoTiePdy6fK-YnNYof10E0f5N9M7RdPeZc37UuQSvkEdYhyCKN2l5q0cpj8VtBjPaZ_RqiUx-TKE_8dUbgtSdgik2GtEVB7zPD-45H6wKHIVGWr-ZLhfkmjop0heyn_Kawnat7HL6ehQ5vzxgBVZwAkyLPgMAx0att53PgcvuZwWHegKaNP7fOEunWSpUbI35Iwjgh2wWQQ9p'
        
      } , body: JSON.stringify(postData)}).then(response => {  return response.json();})
      .then(data => {  this.processReturn(data, callback);})
      .catch(error => {  console.log(error);  return(null); });
    } 
  }
  

  
  
}


export default APICall;
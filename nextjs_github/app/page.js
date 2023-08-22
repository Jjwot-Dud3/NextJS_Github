import Image from 'next/image'
import LoginComponent from './components/logincomponent';
import { Octokit } from 'octokit';


//console.log(data)
export default function Home() {
  async function fectchGitHubUser (){
    const octokit = new Octokit({
      //auth: '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'
      clientId:'d336126c60191417b9a4',
      clientSecret: 'd8fad976e95b0d1a556d6c67e73d294aee9908dc'
    })
    var data = await octokit.request('GET /users/{username}/repos', {
      username:'Jjwot-Dud3',
      headers: {
        'X-GitHub-Api-Version': '2022-11-28'
      }

    }) 
    return (data)
  }
  // fectchGitHubUser().then((respon) =>{
  //   console.log(respon)
  // });
  
  return (
    <div>
      <LoginComponent />
    </div>
    )
}

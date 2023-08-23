import Image from 'next/image'
import LoginComponent from './components/logincomponent';
import { Octokit } from 'octokit';
import handler from './api/auth/[...nextauth]/route'

//console.log(data)
export default function Home() {
  async function fectchGitHubUser (){
    
    const octokit = new Octokit({
      clientId: process.env.GITHUB_CLIENT_ID,
      clientSecret: process.env.GITHUB_CLIENT_SECRET
    })
    var data = await octokit.request('GET /users/{username}/repos', {
      username:'Jjwot-Dud3',
      headers: {
        'X-GitHub-Api-Version': '2022-11-28'
      }

    }) 
    return (data)
  }
  fectchGitHubUser().then((respon) =>{
    console.log(respon)
  });
  
  return (
    <div>
      <LoginComponent />
    </div>
    )
}

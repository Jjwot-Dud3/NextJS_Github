import Image from 'next/image'
import LoginComponent from '../components/logincomponent';
/*
const octokit = new Octokit({
  auth: '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'
})
var data = await octokit.request('GET /users', {
  headers: {
    'X-GitHub-Api-Version': '2022-11-28'
  }
})*/
//console.log(data)
export default function Home() {
  return (
    <div>
      <LoginComponent />
    </div>
    )
}

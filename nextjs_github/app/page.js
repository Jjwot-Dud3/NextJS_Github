import Image from 'next/image'
import LoginComponent from './components/logincomponent';
import { Octokit } from 'octokit';
import handler from './api/auth/[...nextauth]/route'

//console.log(data)
export default function Home() {
  return (
    <div>
      <LoginComponent />
    </div>
    )
}

import React from 'react';
import { FaBiking, FaWalking, FaRunning, FaSwimmer} from 'react-icons/fa';
import { useEffect } from 'react';
import alanBtn from "@alan-ai/alan-sdk-web";
import "./App.css";

function Like() {
  const alanKey = 'a2b9ca3d2a3a34489a9e53738810e6d72e956eca572e1d8b807a3e2338fdd0dc/stage';

  useEffect(() => {
    alanBtn({
      key: alanKey,
      onCommand: ({ command }) => {
        if (command === 'test') {
          alert("command run successfully");
        }
      },
    });
  }, [alanKey]);

  return (
    <div>
      <p><b>I am available to assist you with your workout routine. Please feel free to ask me any questions related to exercise and fitness.😃.</b></p>
      <FaBiking color="purple" fontSize="50px" />
      <FaWalking color="purple" fontSize="50px" />
      <FaRunning color="purple" fontSize="50px" />
      <FaSwimmer color="purple" fontSize="50px" />
    </div>
  );
}

export default Like;





// class Like extends Component {
//   const alanKey = "a2b9ca3d2a3a34489a9e53738810e6d72e956eca572e1d8b807a3e2338fdd0dc/stage"
//   useEffect(() => {
//     alanBtn({
//       key:alanKey,
//       onCommand:({ command }) => {
//         if(command === "test"){

//         }
//       },
//     })

//   },[]);
//   render() {
//     return (
//     <div >
//        <p><b>I am available to assist you with your workout routine. Please feel free to ask me any questions related to exercise and fitness.😃.</b></p>
//        <FaBiking color="purple" fontSize="50px" />
//        <FaWalking color="purple" fontSize="50px" />
//        <FaRunning color="purple" fontSize="50px" />
//        <FaSwimmer color="purple" fontSize="50px" />
//     </div>
//     ) 
//   }
// }

// export default Like
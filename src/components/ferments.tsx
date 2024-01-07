export const Ferments: React.FC = () => {
  return (
    <div className="flex flex-col items-center justify-center gap-4">
      ferments
    </div>
  );
};

//   {
//     ferments?.length !== 0 && (
//       <div>
//         {ferments?.map((ferment: Ferment) => {
//           return (
//             <div key={ferment.id}>
//               <div>
//                 Name: <span>{ferment.title}</span>
//                 <br />
//                 Created on:{" "}
//                 <span>{ferment.createdAt.toLocaleDateString()}</span>
//                 <br />
//                 Updated on:{" "}
//                 <span>{ferment.updatedAt.toLocaleDateString()}</span>
//                 <br />
//                 Type: <span>{ferment.type}</span>
//                 {notes && notes[0]?.fermentId === ferment.id && (
//                   <>
//                     <br />
//                     Note: <span>{notes[0].content}</span>
//                   </>
//                 )}
//                 {/* Updated: <span>{ferment.updatedAt.toLocaleDateString()}</span> */}
//                 {/*
//               Idea
//               Age gradient component based on color input *checkpoints and start and end desired color
//               - Now line
//               - Created on line
//               - Color checkpoints
//               - Harvest line
//                */}
//               </div>
//               <span>
//                 <button onClick={() => deleteFerment.mutate(ferment)}>
//                   delete
//                 </button>
//               </span>
//             </div>
//           );
//         })}
//       </div>
//     );
//   }

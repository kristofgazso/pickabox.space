// import React from "react";
// import useAxios from "axios-hooks";

// export default function Fetch() {
//   const [{ data, loading, error }, refetch] = useAxios(
//     "https://en.wikipedia.org/w/api.php?format=json&action=query&generator=random&grnnamespace=0&prop=revisions|images&rvprop=content&grnlimit=9"
//   );

//   if (loading) return <p>Loading....</p>;
//   if (error) return <p>Error!</p>;

//   return (
//     <div>
//       <button onClick={refetch}>refetch</button>
//       {data.map((query) => (
//         <p key={query.pages}>{query.pages}</p>
//       ))}
//     </div>
//   );
// }
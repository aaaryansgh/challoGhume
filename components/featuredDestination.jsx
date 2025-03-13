export default function FeaturedDestination() {
    const destinations=[
     {
         name:"Manali",
         image: "/images/manali.jpg",
     },
     {
         name:"Goa",
         image:"/images/goa.jpg",
     },
     {
         name:"Bodh Gaya",
         image:"/images/gaya.jpg",
     }
    ]
    return(
     <div className="p-6 text-center">
         <h2 className="mb-6 text-3xl font-bold">Featured Destinations</h2>
         <div className="flex flex-wrap justify-center gap-6">
             {destinations.map((dest,index)=>(
                 <div key={index} className="w-60">
                     <img src={dest.image} alt={dest.name} className="rouned-lg w-full h-60 object-cover" />
                     <h3 className="mt-2 font-semibold">{dest.name}</h3>
                 </div>
             ))}
         </div>
     </div>
    )
 }
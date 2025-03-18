export default function Travelpackage(){
    const packages=[
        {
            name:"Manali getaway",
            price:"₹ 10,000",
            duration:"4days/3nights",
            image:"/images/manali-package.jpg"
        },
        {
            name:"Goa beach",
            price:"₹ 15,000",
            duration:"5days/4nights",
            image:"/images/goa-package.jpg"
        },
        {
            name:"Bodh Gaya",
            price:"₹ 12,000",
            duration:"3days/2nights",
            image:"/images/gaya-package.jpg"
        }
    ]
    return (
        <div className="p-6 text-center">
            <h2 className="text-3xl font-bold text-center mb-6">Travel Packages</h2>
            <div className="flex flex-wrap justify-center gap-6">
                {packages.map((pack,index)=>(
                    <div key={index} className="w-80 p-1 font-mono shadow-md rounded-lg  overflow-hidden text-black">
                        <img src={pack.image} alt={pack.name} className="rounded-lg w-full h-60 object-cover" />
                        <h3 className="mt-2 font-semibold">{pack.name}</h3>
                        <p className="text-lg font-bold">{pack.price}</p>
                        <p className="text-sm">{pack.duration}</p>
                        <button className="mt-3 bg-white text-black px-4 py-1 rounded">Book!</button>
                        
                    </div>
                ))}
            </div>
        </div>
    )
}
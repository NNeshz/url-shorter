import DisplayLinks from "./DisplayLinks"

const ListLinks = () => {
  return (
    <div className="flex flex-col justify-center">
        <h3 className="text-xl font-semibold text-center">All your links:</h3>
        <DisplayLinks />
    </div>
  )
}

export default ListLinks
import Icon from "assets/baseline-web-24px.png"

function Footer() {
  return (
    <footer>
      <div>
        <p className="flex gap-2 items-center justify-center text-center py-10 text-md md:text-2xl md:py-20">
          <img src={Icon} alt="web icon" className="inline-block w-7" />
          Find out more at
          <a href="www.people.com" className="text-blue-400">
            www.people.com
          </a>
        </p>
      </div>
      <div>
        <p className="text-center py-10 bg-neutral-700 text-white text-sm">
          Terms & Conditions | Privacy Policy
        </p>
      </div>
    </footer>
  )
}
export default Footer

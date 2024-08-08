import Image from "next/image"
import Link from "next/link"

const Footer = () => {
  return (
    <footer className="border-t">
        <div className="flex-centre wrapper flex-between flex flex-col gap-4 p-5 md:flex-row">
            <Link
             href='/'
            >
                <Image
                    alt="Evently Logo"
                    src="/assets/images/logo.svg"
                    width={128}
                    height={38}
                />
            </Link>
            <p>@2024 All right reserved</p>
        </div>
    </footer>
  )
}

export default Footer
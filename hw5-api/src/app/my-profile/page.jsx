import Link from "next/link"

const MyProfilePage = ()=>{
    return (
        <div>
            Day la trang profile
            <Link href="/my-profile/password" >Đổi mật khẩu</Link>
        </div>
    )
}
export default MyProfilePage
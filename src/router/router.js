import {createRouter, createWebHistory} from "vue-router"
import MainPage from "@/pages/MainPage.vue"
import MyProfilePage from "@/pages/MyProfilePage.vue"
import UserProfilePage from "@/pages/UserProfilePage.vue"
import ConfirmSkillPage from "@/pages/ConfirmSkillPage.vue"
import RequestConfirmationPage from "@/pages/RequestConfirmationPage.vue"
import RateSkillPage from "@/pages/RateSkillPage.vue"
import AddDiplomaToUserPage from "@/pages/AddDiplomaToUserPage.vue"

const routes = [
    {
        path: '/',
        component: MainPage
    },
    {
        path: '/my-profile',
        component: MyProfilePage
    },
    {
        path: '/confirm-skill',
        component: ConfirmSkillPage
    },
    {
        path: '/request-confirmation',
        component: RequestConfirmationPage
    },
    {
        path: '/rate-skill',
        component: RateSkillPage
    },
    {
        path: '/user-profile',
        component: UserProfilePage
    },
    {
        path: '/upload-diploma',
        component: AddDiplomaToUserPage
    },
]

const router = createRouter(
    {
        history: createWebHistory(process.env.BASE_URL),
        routes
    })

export default router
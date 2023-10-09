import { useCallback, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useRecoilState } from "recoil";
import { getProfileMe, getUserProfile } from "../../data/atom";
import { scrollTop } from "../../helper/scrolltop";
import Header from "../../components/header/header";
import ProfileCover from "../../components/profilecover/profilecover";
import ProfileMenu from "../../components/profilemenu/profilemenu";
import Sidebar from "../../components/sidebar/sidebar";
import NewArtwork from "../../components/artwork/newartwork";
import ExploreArtwork from "../../components/artwork/explore";
import Loader from "../../components/loader/loader";
import Api from "../../api/api";
import {
  MultiChatSocket,
  MultiChatWindow,
  useMultiChatLogic,
} from "react-chat-engine-advanced";
import { PrettyChatWindow } from "react-chat-engine-pretty";

function Chats() {
  let { id } = useParams();
  const [isAuth, setIsAuth] = useState(false);
  const [isLoader, setLoader] = useState(true);
  const [notifications, setNotifications] = useState({});
  const [allUsers, setAllUsers] = useState([]);
  const [allNFT, setAllNFT] = useState([]);
  const [profileMe, setProfileMe] = useRecoilState(getProfileMe);
  const [profileUser, setProfileUser] = useRecoilState(getUserProfile);

  const chatProps = useMultiChatLogic(
    "8aebf3d6-1657-4424-a474-577c8b134326",
    profileMe.fullName,
    profileMe.email
  );
  console.log(profileMe);
  const getProfile = useCallback(async (isSubscribe) => {
    const res = await Api.getProfile();
    if (isSubscribe) {
      if (res.status === 200) {
        setProfileMe(res.data.data);
        localStorage.setItem("user", JSON.stringify(res.data.data));
      }
    }
  }, []);

  const getProfileUser = useCallback(async (isSubscribe) => {
    const res = await Api.getUserProfile(id);
    if (isSubscribe) {
      if (res.status === 200) {
        setProfileUser(res.data.data);
      }
    }
  }, []);

  const getAllUsers = useCallback(async (isSubscribe) => {
    const res = await Api.getAllUsers();
    if (isSubscribe) {
      if (res.status === 200) {
        setAllUsers(res.data.data);
        setTimeout(() => {
          setLoader(false);
        }, 1000);
      } else {
        setLoader(false);
      }
    }
  }, []);

  const getAllSavedNFT = useCallback(async (isSubscribe) => {
    const res = await Api.getSavedNFT();
    if (isSubscribe) {
      if (res.status === 200) {
        setAllNFT(res.data.data);
      }
    }
  }, []);

  const getNotifications = useCallback(async (isSubscribe) => {
    const res = await Api.getUserNotifications();
    if (isSubscribe) {
      if (res.status === 200) {
        setNotifications(res.data.data);
      }
    }
  }, []);

  useEffect(() => {
    let isSubscribe = true;
    getProfile(isSubscribe);
    return () => (isSubscribe = false);
  }, []);

  useEffect(() => {
    let isSubscribe = true;
    getProfileUser(isSubscribe);
    return () => (isSubscribe = false);
  }, []);

  useEffect(() => {
    let isSubscribe = true;
    getNotifications(isSubscribe);
    return () => (isSubscribe = false);
  }, []);

  useEffect(() => {
    let isSubscribe = true;
    getAllSavedNFT(isSubscribe);
    return () => (isSubscribe = false);
  }, []);

  useEffect(() => {
    let isSubscribe = true;
    getAllUsers(isSubscribe);
    return () => (isSubscribe = false);
  }, []);

  useEffect(() => {
    const body = document.querySelector("body");
    body.style.overflowY = "auto";
    scrollTop();
    setIsAuth(profileMe._id === id ? true : false);
  }, []);

  return (
    <>
      {isLoader && <Loader />}
      <Header allUsers={allUsers} notifications={notifications} />
      <div className="page-body">
        {/* <Sidebar /> */}
        <div
          className="chats"
          style={{
            width: "100%",
          }}
        >
          {/* <MultiChatSocket {...chatProps} />
          <MultiChatWindow
            {...chatProps}
            style={{
              height: "100%",
            }}
          /> */}
          <PrettyChatWindow
            style={{
              height: "80vh",
              fontFamily: "unset",
            }}
            projectId="8aebf3d6-1657-4424-a474-577c8b134326"
            username={profileMe.fullName}
            secret={profileMe.email}
          />
          {/* <ProfileCover profileUser={profileUser} isAuth={isAuth} userId={id} /> */}
          {/* <ProfileMenu userId={id} /> */}
          {/* <div className="section-t-space px-0 layout-default"> */}
          {/* <div className="content-center"> */}
          {/* {allNFT && allNFT.length > 0 && (
                <div className="explore explore-newItem section-t-space section-b-space">
                  <ExploreArtwork
                    title="Saved"
                    allNFT={allNFT}
                    meId={profileMe._id}
                  />
                </div>
              )} */}
          {/* </div> */}
          {/* </div> */}
        </div>
      </div>
    </>
  );
}

export default Chats;

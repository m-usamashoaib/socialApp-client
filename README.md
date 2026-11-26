# Auctioneer's Hub · Social app

The social side of **Auctioneer's Hub**, where digital artists share their work, follow each other and chat, with their NFTs one click away in the marketplace.

Final-year project, BS Computer Science, GC University Lahore (2023).

| Part | Repository |
|---|---|
| API server | [socialApp-server](https://github.com/m-usamashoaib/socialApp-server) |
| **Social app** (this repo) | React · Recoil · Material UI |
| NFT marketplace | [nft-marketplace](https://github.com/m-usamashoaib/nft-marketplace) |

**👤 Built by** [Muhammad Usama Shoaib](https://m-usamashoaib.github.io) (most of the API and both front-ends) in a two-person team. The UI is partly based on a template; the MetaMask wallet flow was built by my teammate and is not part of these repositories.

## Features

- **Sign up and log in** (JWT cookie set by the API), protected routes
- **Home feed** from the people you follow: create posts with images, like, comment and share
- **Stories** that disappear after 24 hours
- **Profiles** with avatar and cover photo, edit profile and password, followers / following lists
- **Notifications** with seen / unseen state
- **Artwork:** explore NFTs, see the ones you created or own, and save favourites
- **Activity** page with charts (Recharts)
- **Messages:** real-time chat powered by [ChatEngine](https://chatengine.io)
- **Light / dark theme**, toasts, emoji picker, image sliders
- Links straight into the marketplace for collections, bidding and the wallet

## Tech stack

React 18 · React Router · Recoil (state) · Material UI · Axios · Recharts · Swiper / React Slick · react-chat-engine-advanced · React Toastify

## Run locally

1. Start the [API server](https://github.com/m-usamashoaib/socialApp-server) on **port 4000**. This app proxies `/api/v1` calls to it (see `proxy` in `package.json`).
2. Install and start this app:
   ```bash
   npm install
   npm start          # http://localhost:3000
   ```
3. Optional: start the [marketplace](https://github.com/m-usamashoaib/nft-marketplace) on **port 3001** (the app links to it via `src/common/link.jsx`).

The chat uses a ChatEngine project; set your own project id in `src/pages/messages/chats.jsx`.

## What I'd improve today

- Use a separate chat secret: ChatEngine currently identifies users by name and email
- Move URLs and the ChatEngine project id into environment variables
- Replace jQuery-based template plugins with React components, and add tests

## License

MIT

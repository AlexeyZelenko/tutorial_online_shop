<!--<template>-->
<!--	<div class="">-->
<!--		<div class="demo-layout mdl-layout mdl-js-layout mdl-layout&#45;&#45;fixed-header">-->

<!--			&lt;!&ndash; Header section containing logo &ndash;&gt;-->
<!--			<header class="mdl-layout__header mdl-color-text&#45;&#45;white mdl-color&#45;&#45;light-blue-700">-->
<!--				<div class="mdl-cell mdl-cell&#45;&#45;12-col mdl-cell&#45;&#45;12-col-tablet mdl-grid">-->
<!--					<div-->
<!--							class="mdl-layout__header-row mdl-cell mdl-cell&#45;&#45;12-col mdl-cell&#45;&#45;12-col-tablet mdl-cell&#45;&#45;12-col-desktop">-->
<!--						<h3><i class="material-icons">chat_bubble_outline</i>Чат</h3>-->
<!--					</div>-->
<!--					<div id="user-container">-->
<!--						<div hidden id="user-pic"></div>-->
<!--						<div hidden id="user-name"></div>-->
<!--						<button-->
<!--								hidden-->
<!--								id="sign-out"-->
<!--								class="mdl-button mdl-js-button mdl-js-ripple-effect mdl-color-text&#45;&#45;white">-->
<!--							Sign-out-->
<!--						</button>-->
<!--						<button id="sign-in" class="mdl-button mdl-js-button mdl-js-ripple-effect mdl-color-text&#45;&#45;white">-->
<!--							<i-->
<!--									class="material-icons"-->
<!--									@click="signIn"-->
<!--							>-->
<!--								account_circle-->
<!--							</i>-->
<!--							Sign-in with Google-->
<!--						</button>-->
<!--					</div>-->
<!--				</div>-->
<!--			</header>-->

<!--			<main class="mdl-layout__content mdl-color&#45;&#45;grey-100">-->
<!--				<div id="messages-card-container" class="mdl-cell mdl-cell&#45;&#45;12-col mdl-grid">-->

<!--					&lt;!&ndash; Messages container &ndash;&gt;-->
<!--					<div id="messages-card"-->
<!--							class="mdl-card mdl-shadow&#45;&#45;2dp mdl-cell mdl-cell&#45;&#45;12-col mdl-cell&#45;&#45;6-col-tablet mdl-cell&#45;&#45;6-col-desktop">-->
<!--						<div class="mdl-card__supporting-text mdl-color-text&#45;&#45;grey-600">-->
<!--							<div id="messages">-->
<!--							</div>-->
<!--							<form id="message-form" action="#">-->
<!--								<div class="mdl-textfield mdl-js-textfield mdl-textfield&#45;&#45;floating-label">-->
<!--									<input class="mdl-textfield__input" type="text" id="message" autocomplete="off">-->
<!--									<label class="mdl-textfield__label" for="message">Message...</label>-->
<!--								</div>-->
<!--								<button id="submit" disabled type="submit"-->
<!--										class="mdl-button mdl-js-button mdl-button&#45;&#45;raised mdl-js-ripple-effect">-->
<!--									Send-->
<!--								</button>-->
<!--							</form>-->
<!--							<form id="image-form" action="#">-->
<!--								<input id="mediaCapture" type="file" accept="image/*" capture="camera">-->
<!--								<button id="submitImage" title="Add an image"-->
<!--										class="mdl-button mdl-js-button mdl-button&#45;&#45;raised mdl-js-ripple-effect mdl-color&#45;&#45;amber-400 mdl-color-text&#45;&#45;white">-->
<!--									<i class="material-icons">image</i>-->
<!--								</button>-->
<!--							</form>-->
<!--						</div>-->
<!--					</div>-->

<!--					<div id="must-signin-snackbar" class="mdl-js-snackbar mdl-snackbar">-->
<!--						<div class="mdl-snackbar__text"></div>-->
<!--						<button class="mdl-snackbar__action" type="button"></button>-->
<!--					</div>-->

<!--				</div>-->
<!--			</main>-->
<!--		</div>-->
<!--	</div>-->
<!--</template>-->

<!--<script>-->
<!--    import firebase from '@/main.js'-->

<!--    export default {-->
<!--        name: "vAdminChat",-->
<!--        data: () => ({-->

<!--        }),-->
<!--        // // components: {},-->
<!--        // methods: {-->
<!--        //     initFirebase() {-->
<!--        //         // Shortcuts to Firebase SDK features.-->
<!--        //         this.auth = firebase.auth();-->
<!--        //         this.database = firebase.database();-->
<!--        //         this.storage = firebase.storage();-->
<!--        //         // Инициирует авторизацию Firebase и прослушивает изменения состояния аутентификации.-->
<!--        //         this.auth.onAuthStateChanged(this.onAuthStateChanged.bind(this));-->
<!--        //     },-->
<!--				//-->
<!--        //     // Устанавливает ярлыки для функций Firebase и запускает аутентификацию Firebase.-->
<!--				//-->
<!--        //     // Signs-in Friendly Chat.-->
<!--        //     signIn() {-->
<!--        //         // Войдите в Firebase, используя popup auth и Google в качестве провайдера идентификации.-->
<!--        //         let provider = new firebase.auth.GoogleAuthProvider();-->
<!--        //         firebase.auth().signInWithPopup(provider);-->
<!--				//-->
<!--				//-->
<!--        //     },-->
<!--        //     // Выход из дружественного чата.-->
<!--        //     signOut() {-->
<!--        //         // Выйти из Firebase.-->
<!--        //         firebase.auth().signOut();-->
<!--        //     },-->
<!--        //     // setImageUrl(imageUri, imgElement) {-->
<!--        //     //     // Если изображение представляет собой URI хранилища Firebase, мы получаем URL-->
<!--        //     //     if (imageUri.startsWith('gs://')) {-->
<!--        //     //         imgElement.src = products.LOADING_IMAGE_URL; // Сначала отобразите загружаемое изображение-->
<!--        //     //         this.storage.refFromURL(imageUri).getMetadata().then(function(metadata) {-->
<!--        //     //             imgElement.src = metadata.downloadURLs[0];-->
<!--        //     //         });-->
<!--        //     //     } else {-->
<!--        //     //         imgElement.src = imageUri;-->
<!--        //     //     }-->
<!--        //     // },-->
<!--        // },-->
<!--        computed: {-->

<!--        },-->
<!--        watch: {-->

<!--        },-->
<!--				mounted() {-->
<!--            // Get a non-default Storage bucket-->
<!--            let storage = firebase.app().storage("gs://online-shop-34af2.appspot.com");-->
<!--            console.log(storage)-->

<!--					this.initFirebase()-->

<!--				},-->
<!--        props: {},-->
<!--    }-->
<!--</script>-->

<!--<style scoped>-->
<!--	body {-->
<!--		font-family: 'Roboto', 'Helvetica', sans-serif;-->
<!--	}-->

<!--	main, #messages-card {-->
<!--		height: 100%;-->
<!--		padding-bottom: 0;-->
<!--	}-->

<!--	#messages-card-container {-->
<!--		height: calc(100% - 35px);-->
<!--		padding-bottom: 0;-->
<!--	}-->

<!--	#messages-card {-->
<!--		margin-top: 15px;-->
<!--	}-->

<!--	.mdl-layout__header-row span {-->
<!--		margin-left: 15px;-->
<!--		margin-top: 17px;-->
<!--	}-->

<!--	.mdl-grid {-->
<!--		max-width: 1024px;-->
<!--		margin: auto;-->
<!--	}-->

<!--	.material-icons {-->
<!--		font-size: 36px;-->
<!--		top: 8px;-->
<!--		position: relative;-->
<!--	}-->

<!--	.mdl-layout__header-row {-->
<!--		padding: 0;-->
<!--		margin: 0 auto;-->
<!--	}-->

<!--	.mdl-card__supporting-text {-->
<!--		width: auto;-->
<!--		height: 100%;-->
<!--		padding-top: 0;-->
<!--		padding-bottom: 0;-->
<!--	}-->

<!--	#messages {-->
<!--		overflow-y: auto;-->
<!--		margin-bottom: 10px;-->
<!--		height: calc(100% - 80px);-->
<!--		display: flex;-->
<!--		flex-direction: column;-->
<!--	}-->

<!--	#message-filler {-->
<!--		flex-grow: 1;-->
<!--	}-->

<!--	.message-container:first-of-type {-->
<!--		border-top-width: 0;-->
<!--	}-->

<!--	.message-container {-->
<!--		display: block;-->
<!--		margin-top: 10px;-->
<!--		border-top: 1px solid #f3f3f3;-->
<!--		padding-top: 10px;-->
<!--		opacity: 0;-->
<!--		transition: opacity 1s ease-in-out;-->
<!--	}-->

<!--	.message-container.visible {-->
<!--		opacity: 1;-->
<!--	}-->

<!--	.message-container .pic {-->
<!--		/*background-image: url('/images/profile_placeholder.png');*/-->
<!--		background-repeat: no-repeat;-->
<!--		width: 30px;-->
<!--		height: 30px;-->
<!--		background-size: 30px;-->
<!--		border-radius: 20px;-->
<!--	}-->

<!--	.message-container .spacing {-->
<!--		display: table-cell;-->
<!--		vertical-align: top;-->
<!--	}-->

<!--	.message-container .message {-->
<!--		display: table-cell;-->
<!--		width: calc(100% - 40px);-->
<!--		padding: 5px 0 5px 10px;-->
<!--	}-->

<!--	.message-container .name {-->
<!--		display: inline-block;-->
<!--		width: 100%;-->
<!--		padding-left: 40px;-->
<!--		color: #bbb;-->
<!--		font-style: italic;-->
<!--		font-size: 12px;-->
<!--		box-sizing: border-box;-->
<!--	}-->

<!--	#message-form {-->
<!--		display: flex;-->
<!--		flex-direction: row;-->
<!--		width: calc(100% - 48px);-->
<!--		float: left;-->
<!--	}-->

<!--	#image-form {-->
<!--		display: flex;-->
<!--		flex-direction: row;-->
<!--		width: 48px;-->
<!--		float: right;-->
<!--	}-->

<!--	#message-form .mdl-textfield {-->
<!--		width: calc(100% - 100px);-->
<!--	}-->

<!--	#message-form button, #image-form button {-->
<!--		width: 100px;-->
<!--		margin: 15px 0 0 10px;-->
<!--	}-->

<!--	.mdl-card {-->
<!--		min-height: 0;-->
<!--	}-->

<!--	.mdl-card {-->
<!--		background: linear-gradient(white, #f9f9f9);-->
<!--		justify-content: space-between;-->
<!--	}-->

<!--	#user-container {-->
<!--		position: absolute;-->
<!--		display: flex;-->
<!--		flex-direction: row;-->
<!--		top: 22px;-->
<!--		width: 100%;-->
<!--		right: 0;-->
<!--		padding-left: 10px;-->
<!--		justify-content: flex-end;-->
<!--		padding-right: 10px;-->
<!--	}-->

<!--	#user-container #user-pic {-->
<!--		top: -3px;-->
<!--		position: relative;-->
<!--		display: inline-block;-->
<!--		/*background-image: url('/images/profile_placeholder.png');*/-->
<!--		background-repeat: no-repeat;-->
<!--		width: 40px;-->
<!--		height: 40px;-->
<!--		background-size: 40px;-->
<!--		border-radius: 20px;-->
<!--	}-->

<!--	#user-container #user-name {-->
<!--		font-size: 16px;-->
<!--		line-height: 36px;-->
<!--		padding-right: 10px;-->
<!--		padding-left: 20px;-->
<!--	}-->

<!--	#image-form #submitImage {-->
<!--		width: auto;-->
<!--		padding: 0 6px 0 1px;-->
<!--		min-width: 0;-->
<!--	}-->

<!--	#image-form #submitImage .material-icons {-->
<!--		top: -1px;-->
<!--	}-->

<!--	.message img {-->
<!--		max-width: 300px;-->
<!--		max-height: 200px;-->
<!--	}-->

<!--	#mediaCapture {-->
<!--		display: none;-->
<!--	}-->

<!--	@media screen and (max-width: 610px) {-->
<!--		header {-->
<!--			height: 113px;-->
<!--			padding-bottom: 80px !important;-->
<!--		}-->

<!--		#user-container {-->
<!--			top: 72px;-->
<!--			background-color: rgb(3, 155, 229);-->
<!--			height: 38px;-->
<!--			padding-top: 3px;-->
<!--			padding-right: 2px;-->
<!--		}-->

<!--		#user-container #user-pic {-->
<!--			top: 2px;-->
<!--			width: 33px;-->
<!--			height: 33px;-->
<!--			background-size: 33px;-->
<!--		}-->
<!--	}-->

<!--	.mdl-textfield__label:after {-->
<!--		background-color: #0288D1;-->
<!--	}-->

<!--	.mdl-textfield&#45;&#45;floating-label.is-focused .mdl-textfield__label {-->
<!--		color: #0288D1;-->
<!--	}-->

<!--	.mdl-button .material-icons {-->
<!--		top: -1px;-->
<!--		margin-right: 5px;-->
<!--	}-->

<!--</style>-->
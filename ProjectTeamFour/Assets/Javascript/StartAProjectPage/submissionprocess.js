﻿var splitJoin;
var pmu;
var pcu;
var piu;
var priu;
var imgSwitch;
var editorImgId = 0;
var imgurArray = [];
const id = 'ae6d69a08006f9d'; // 填入 App 的 Client ID
const token = 'da270109cacdb90f4dd7f0539f983217e184c45a'; // 填入 token
const album = 'J1vm7F3'; // 若要指定傳到某個相簿，就填入相簿的 ID
var url;



Vue.component("multi-text", {
    template: "#multi-text-template",
    // props: ['value'],
    data: function () {
        return {
            ProjectQuestionAnswer: [{
                Question: "",
                Answer: "",
                Count: 0,
                QAError: "",
                QAErrorMsg: "",
            }],
        };
    },
    methods: {
        updateValue: function () {
            console.debug(JSON.stringify(this.ProjectQuestionAnswer));
            this.$emit("input", this.ProjectQuestionAnswer);
            this.ProjectQuestionAnswer.forEach(function (item) {
                if (item.Question == "" || item.Answer == "") {
                    item.QAError = true;
                    item.QAErrorMsg = "常見問答請填完善";
                } else {
                    item.QAError = false;
                    item.QAErrorMsg = "";
                }
            });
            this.checkAddVerifyQA();
        },
        deleteValue: function (index) {
            this.ProjectQuestionAnswer.splice(index, 1);
            console.debug(JSON.stringify(this.ProjectQuestionAnswer));
            this.$emit("input", this.ProjectQuestionAnswer);
        },
        addInput: function () {
            this.ProjectQuestionAnswer
            this.ProjectQuestionAnswer.push({
                Question: this.ProjectQuestionAnswer.Question,
                Answer: this.ProjectQuestionAnswer.Answer,
                Count: this.ProjectQuestionAnswer[this.ProjectQuestionAnswer.length - 1]
                    .Count + 1,
            });
            this.$emit("input", this.ProjectQuestionAnswer);
            //console.log(this.ProjectQuestionAnswer);
        },
        checkAddVerifyQA: function () {
            for (let index in this.ProjectQuestionAnswer) {
                if (this.ProjectQuestionAnswer[index] == true) {
                    this.AddVerify = false;
                    return;
                }
            }
            this.AddVerify = true;
        },
    },
    watch: {
        "ProjectQuestionAnswer": {
            immediate: false,
            deep: true,
            handler: function () {
                this.ProjectQuestionAnswer.forEach((el, index) => {
                    el.Count = index;
                });
            }
        }
    }
})



// A = "",  A == false 成立 , A === false 不成立  
// A = null , A 不是true 也不是 false  就是 null
// A = 數字 , A == true 成立, A === true 不成立
// A = 字串 , A 不是true 也不是 false 就是 null
// 特殊情況 A = "1" , A == true 成立, A === true 不成立
// 特殊情況 A = "0", A == true 成立, A === true 不成立



var form = new Vue({
    el: "#myApp",
    data: {
        AddVerify: false,
        AddVerifyModal: false,
        inputData: {
            ProjectName: "取個好標題",
            AmountThreshold: "",
            Category: "專案領域",
            StartDate: "",
            EndDate: "",
            ProjectVideoUrl: "",
            ProjectMainUrl: "",
            ProjectCoverUrl: "",
            ProjectPrincipal: "",
            MemberConEmail: "",
            MemberPhone: "",
            IdentityNumber: "",
            TeamPicture: "",
            MemberName: "提案團隊姓名",
            AboutMe: "",
            MemberWebsite: "",
            QuillHtml: "",
        },
        inputDataCheck: {
            ProjectNameError: 1,
            AmountThresholdError: 1,
            CategoryError: 1,
            StartDateAndEndDateError: 1,
            ProjectVideoUrlError: 1,
            ProjectMainUrlError: 1,
            ProjectCoverUrlError: 1,
            ProjectPrincipalError: 1,
            MemberConEmailError: 1,
            MemberPhoneError: 1,
            IdentityNumberError: 1,
            TeamPictureError: 1,
            MemberNameError: 1,
            AboutMeError: 1,
            MemberWebsiteError: 1,
        },
        inputDataCheckErrorMsg: {
            AmountThresholdErrorMsg: "",
            ProjectNameErrorMsg: "",
            CategoryErrorMsg: "",
            StartDateAndEndDateErrorMsg: "",
            ProjectVideoUrlErrorMsg: "",
            ProjectMainUrlErrorMsg: "",
            ProjectCoverUrlErrorMSg: "",
            ProjectPrincipalErrorMsg: "",
            MemberConEmailErrorMsg: "",
            MemberPhoneErrorMsg: "",
            IdentityNumberErrorMsg: "",
            MemberNameErrorMsg: "",
            TeamPictureErrorMsg: "",
            AboutMeErrorMsg: "",
            MemberWebsiteErrorMsg: "",
        },
        modalData: {
            PlanPrice: "",
            PlanTitle: "",
            QuantityLimit: "",
            AddCarCarPlanSwitch: "",
            PlanDescription: "",
            PlanImgUrl: "",
            PlanShipDateYear: "year",
            PlanShipDateMonth: "month",
            tempYear: "",
            tempMonth: "",
            makePlanCount: 0,
        },
        modalDataCheck: {    //這裡一開始空字串 我是用 immediate 去watch 所以一開始就是 true 也就是有缺漏 必須填完，跟inputDataCheck 做法不一樣
            PlanPriceError: "",
            PlanTitleError: "",
            QuantityLimitError: "",
            AddCarCarPlanSwitchError: "",
            PlanDescriptionError: "",
            PlanImgUrlError: true,
            PlanShipDateError: "",
        },
        modalDataCheckErrorMsg: {
            PlanPriceErrorMsg: "",
            PlanTitleErrorMsg: "",
            QuantityLimitErrorMsg: "",
            AddCarCarPlanSwitchErrorMsg: "",
            PlanDescriptionErrorMsg: "",
            PlanImgUrlErrorMsg: "",
            PlanShipDateErrorMsg: "",
        },
        modalList: [{
            ProjectPlanId: "",
            ViewId: "",
            makePlanCount: "",
            PlanPrice: "",
            PlanTitle: "",
            QuantityLimit: "",
            AddCarCarPlanSwitch: "",
            AddCarCarPlan: "",
            PlanDescription: "",
            PlanImgUrl: "",
            PlanShipDateYear: "",
            PlanShipDateMonth: "",
            PlanShipDate: "",
        }],
        ProjectQuestionAnswer: [{}],
    },
    watch: {
        "inputData.ProjectName": {
            // immediate: false,
            handler: function () {
                if (this.inputData.ProjectName == "") {
                    this.inputDataCheck.ProjectNameError = true;
                    this.inputDataCheckErrorMsg.ProjectNameErrorMsg = "專案標題不得為空";
                } else if (this.inputData.ProjectName == "取個好標題") {
                    this.inputDataCheck.ProjectNameError = true;
                    this.inputDataCheckErrorMsg.ProjectNameErrorMsg = "請取專案標題";
                } else if (this.inputData.ProjectName.length > 40) {
                    this.inputDataCheck.ProjectNameError = true;
                    this.inputDataCheckErrorMsg.ProjectNameErrorMsg = "專案標題不得超過40字";
                } else {
                    this.inputDataCheck.ProjectNameError = false;
                    this.inputDataCheckErrorMsg.ProjectNameErrorMsg = "";
                }
                this.checkAddVerify();
            }
        },
        "inputData.AmountThreshold": {
            handler: function () {
                noZeroFirst = /^[1-9]\d*$/;
                if (this.inputData.AmountThreshold == "") {
                    this.inputDataCheck.AmountThresholdError = true;
                    this.inputDataCheckErrorMsg.AmountThresholdErrorMsg = "募資目標不得為空";
                } else if (!noZeroFirst.test(this.inputData.AmountThreshold)) {
                    this.inputDataCheck.AmountThresholdError = true;
                    this.inputDataCheckErrorMsg.AmountThresholdErrorMsg = "第一個數字不得為0，也不得為負";
                } else if (this.inputData.AmountThreshold < 5000) {
                    this.inputDataCheck.AmountThresholdError = true;
                    this.inputDataCheckErrorMsg.AmountThresholdErrorMsg = "最低金額為$5000";
                } else if (this.inputData.AmountThreshold > 1000000000) {
                    this.inputDataCheck.AmountThresholdError = true;
                    this.inputDataCheckErrorMsg.AmountThresholdErrorMsg = "上限為10億, 特殊情況請聯絡我們!";
                } else {
                    this.inputDataCheck.AmountThresholdError = false;
                    this.inputDataCheckErrorMsg.AmountThresholdErrorMsg = "";
                }
                this.checkAddVerify();
            }
        },
        // "inputData.StartDate": { //待處理
        //     handler: function () {
        //         if (this.inputData.StartDate == "") {
        //             this.inputDataCheck.StartDateError = true;
        //             this.inputDataCheck.StartDateAndEndDateErrorMsg = "募資時間不得為空";
        //         } else if (this.inputData.StartDate > 1000000000) {
        //             this.inputDataCheck.StartDateError = true;
        //             this.inputDataCheck.StartDateAndEndDateErrorMsg = "";
        //         } else {
        //             this.inputDataCheck.StartDateError = false;
        //             this.inputDataCheck.StartDateAndEndDateErrorMsg = "";
        //         }
        //         this.checkAddVerify();
        //     }
        // },
        // "inputData.EndDate": { //待處理
        //     handler: function () {
        //         if (this.inputData.EndDate == "") {
        //             this.inputDataCheck.EndDateError = true;
        //             this.inputDataCheck.StartDateAndEndDateErrorMsg = "募資時間不得為空";
        //         } else if (this.inputData.EndDate > 1000000000) {
        //             this.inputDataCheck.EndDateError = true;
        //             this.inputDataCheck.StartDateAndEndDateErrorMsg = "";
        //         } else {
        //             this.inputDataCheck.EndDateError = false;
        //             this.inputDataCheck.StartDateAndEndDateErrorMsg = "";
        //         }
        //         this.checkAddVerify();
        //     }
        // },
        "inputData.ProjectVideoUrl": { //缺一個正則
            handler: function () {
                let videoUrlRegexp =
                    /[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)/;
                if (this.inputData.ProjectVideoUrl == "") {
                    this.inputDataCheck.ProjectVideoUrlError = true;
                    this.inputDataCheckErrorMsg.ProjectVideoUrlErrorMsg = "專案影片不得為空";
                } else if (!videoUrlRegexp.test(this.inputData.ProjectVideoUrl)) {
                    this.inputDataCheck.ProjectVideoUrlError = true;
                    this.inputDataCheckErrorMsg.ProjectVideoUrlErrorMsg = "Url格式不對";
                } else {
                    this.inputDataCheck.ProjectVideoUrlError = false;
                    this.inputDataCheckErrorMsg.ProjectVideoUrlErrorMsg = "";
                }
                this.checkAddVerify();
            }
        },
        "inputData.ProjectPrincipal": {
            handler: function () {
                if (this.inputData.ProjectPrincipal == "") {
                    this.inputDataCheck.ProjectPrincipalError = true;
                    this.inputDataCheckErrorMsg.ProjectPrincipalErrorMsg = "負責人姓名不能為空";
                } else {
                    this.inputDataCheck.ProjectPrincipalError = false;
                    this.inputDataCheckErrorMsg.ProjectPrincipalErrorMsg = "";
                }
                this.checkAddVerify();
            }
        },
        "inputData.MemberConEmail": {
            handler: function () {
                let emailRegexp =
                    /(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:(2(5[0-5]|[0-4][0-9])|1[0-9][0-9]|[1-9]?[0-9]))\.){3}(?:(2(5[0-5]|[0-4][0-9])|1[0-9][0-9]|[1-9]?[0-9])|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])/;
                if (this.inputData.MemberConEmail == "") {
                    this.inputDataCheck.MemberConEmailError = true;
                    this.inputDataCheckErrorMsg.MemberConEmailErrorMsg = "電子郵件不能為空";
                } else if (!emailRegexp.test(this.inputData.MemberConEmail)) {
                    this.inputDataCheck.MemberConEmailError = true;
                    this.inputDataCheckErrorMsg.MemberConEmailErrorMsg = "請符合Email格式";
                } else {
                    this.inputDataCheck.MemberConEmailError = false;
                    this.inputDataCheckErrorMsg.MemberConEmailErrorMsg = "";
                }
                this.checkAddVerify();
            }
        },
        "inputData.MemberPhone": {
            handler: function () {
                let phoneRegexp = /09\d{2}(\d{6}|-\d{3}-\d{3})/;
                if (!phoneRegexp.test(this.inputData.MemberPhone)) {
                    this.inputDataCheck.MemberPhoneError = true;
                    this.inputDataCheckErrorMsg.MemberPhoneErrorMsg = "行動電話格式不對";
                } else if (this.inputData.MemberPhone == "") {
                    this.inputDataCheck.MemberPhoneError = true;
                    this.inputDataCheckErrorMsg.MemberPhoneErrorMsg = "行動電話不能為空";
                } else {
                    this.inputDataCheck.MemberPhoneError = false;
                    this.inputDataCheckErrorMsg.MemberPhoneErrorMsg = "";
                }
                this.checkAddVerify();
            }
        },
        "inputData.IdentityNumber": {
            handler: function () {
                let phoneRegexp = /^[A-Za-z][12]\d{8}$/;
                if (!phoneRegexp.test(this.inputData.IdentityNumber)) {
                    this.inputDataCheck.IdentityNumberError = true;
                    this.inputDataCheckErrorMsg.IdentityNumberErrorMsg = "身分證字號格式不對";
                } else if (this.inputData.IdentityNumber == "") {
                    this.inputDataCheck.IdentityNumberError = true;
                    this.inputDataCheckErrorMsg.IdentityNumberErrorMsg = "身分證字號不能為空";
                } else {
                    this.inputDataCheck.IdentityNumberError = false;
                    this.inputDataCheckErrorMsg.IdentityNumberErrorMsg = "";
                }
                this.checkAddVerify();
            }
        },
        "inputData.MemberName": {
            handler: function () {
                if (this.inputData.MemberName == "") {
                    this.inputDataCheck.MemberNameError = true;
                    this.inputDataCheckErrorMsg.MemberNameErrorMsg = "執行團隊名稱不能為空";
                } else {
                    this.inputDataCheck.MemberNameError = false;
                    this.inputDataCheckErrorMsg.MemberNameErrorMsg = "";
                }
                this.checkAddVerify();
            }
        },
        "inputData.AboutMe": {
            handler: function () {
                if (this.inputData.AboutMe == "") {
                    this.inputDataCheck.AboutMeError = true;
                    this.inputDataCheckErrorMsg.AboutMeErrorMsg = "自我介紹不能為空";
                } else {
                    this.inputDataCheck.AboutMeError = false;
                    this.inputDataCheckErrorMsg.AboutMeErrorMsg = "";
                }
                this.checkAddVerify();
            }
        },
        "inputData.MemberWebsite": {
            handler: function () {
                let siteRegexp =
                    /[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)/;
                if (this.inputData.MemberWebsite == "") {
                    this.inputDataCheck.MemberWebsiteError = true;
                    this.inputDataCheckErrorMsg.MemberWebsiteErrorMsg = "專案網站不能為空";
                } else if (!siteRegexp.test(this.inputData.MemberWebsite)) {
                    this.inputDataCheck.MemberWebsiteError = true;
                    this.inputDataCheckErrorMsg.MemberWebsiteErrorMsg = "網址格式不正確";
                } else {
                    this.inputDataCheck.MemberWebsiteError = false;
                    this.inputDataCheckErrorMsg.MemberWebsiteErrorMsg = "";
                }
                this.checkAddVerify();
            }
        },
        // "ProjectQuestionAnswer.Question": {
        //     handler: function () {
        //         if (this.ProjectQuestionAnswer.Question == "") {
        //             this.QuestionError = true;
        //             this.QuestionErrorMsg = "專案網站不能為空";
        //         } else {
        //             this.QuestionError = false;
        //             this.QuestionErrorMsg = "";
        //         }
        //         this.checkAddVerify();
        //     }
        // },
        // "ProjectQuestionAnswer.Answer": {
        //     handler: function () {
        //         if (this.ProjectQuestionAnswer.Answer == "") {
        //             this.AnswerError = true;
        //             this.AnswerErrorMsg = "專案網站不能為空";
        //         } else {
        //             this.AnswerError = false;
        //             this.AnswerErrorMsg = "";
        //         }
        //         this.checkAddVerify();
        //     }
        // },
        "modalData.PlanPrice": {
            immediate: true,
            handler: function () {
                noZeroFirst = /^[1-9]\d*$/;
                if (this.modalData.PlanPrice == "") {
                    this.modalDataCheck.PlanPriceError = true;
                    this.modalDataCheckErrorMsg.PlanPriceErrorMsg = "回饋金額不得為空";
                } else if (!noZeroFirst.test(this.modalData.PlanPrice)) {
                    this.modalDataCheck.PlanPriceError = true;
                    this.modalDataCheckErrorMsg.PlanPriceErrorMsg = "第一個數字不得為0";
                } else if (this.modalData.PlanPrice < 100) {
                    this.modalDataCheck.PlanPriceError = true;
                    this.modalDataCheckErrorMsg.PlanPriceErrorMsg = "最低金額為$100";
                } else if (this.modalData.PlanPrice > 500000) {
                    this.modalDataCheck.PlanPriceError = true;
                    this.modalDataCheckErrorMsg.PlanPriceErrorMsg = "上限為50萬, 特殊情況請聯絡我們!";
                } else {
                    this.modalDataCheck.PlanPriceError = false;
                    this.modalDataCheckErrorMsg.PlanPriceErrorMsg = "";
                }
                this.checkAddVerifyModal();
            }
        },
        "modalData.PlanTitle": {
            immediate: true,
            handler: function () {
                if (this.modalData.PlanTitle == "") {
                    this.modalDataCheck.PlanTitleError = true;
                    this.modalDataCheckErrorMsg.PlanTitleErrorMsg = "回饋標題不得為空";
                } else {
                    this.modalDataCheck.PlanTitleError = false;
                    this.modalDataCheckErrorMsg.PlanTitleErrorMsg = "";
                }
                this.checkAddVerifyModal();
            }
        },
        "modalData.QuantityLimit": {
            immediate: true,
            handler: function () {
                if (this.modalData.QuantityLimit == "") {
                    this.modalDataCheck.QuantityLimitError = true;
                    this.modalDataCheckErrorMsg.QuantityLimitErrorMsg = "回饋數量限制不得為空";
                } else {
                    this.modalDataCheck.QuantityLimitError = false;
                    this.modalDataCheckErrorMsg.QuantityLimitErrorMsg = "";
                }
                this.checkAddVerifyModal();
            }
        },
        "modalData.PlanShipDateYear": {
            immediate: true,
            handler: function () {
                if (this.modalData.PlanShipDateYear == "") {
                    this.modalDataCheck.PlanShipDateYearError = true;
                    this.modalDataCheckErrorMsg.PlanShipDateYearErrorMsg = "年份不得為空";
                } else {
                    this.modalDataCheck.PlanShipDateYearError = false;
                    this.modalDataCheckErrorMsg.PlanShipDateYearErrorMsg = "";
                }
                this.checkAddVerifyModal();
            }
        },
        "modalData.PlanDescription": {
            immediate: true,
            handler: function () {
                if (this.modalData.PlanDescription == "") {
                    this.modalDataCheck.PlanDescriptionError = true;
                    this.modalDataCheckErrorMsg.PlanDescriptionErrorMsg = "請填寫回饋方案內容";
                } else {
                    this.modalDataCheck.PlanDescriptionError = false;
                    this.modalDataCheckErrorMsg.PlanDescriptionErrorMsg = "";
                }
                this.checkAddVerifyModal();
            }
        },
        // "modalList": {
        //     immediate: false,
        //     deep: true,
        //     handler: function () {
        //         this.modalList.forEach((el, index) => {
        //             el.ProjectPlanId = index;
        //             console.log(modalList[index]);
        //         });
        //     }
        // }

    },
    methods: {
        getStartDateAndEndDate(e) {
            if (this.inputData.StartDate == "" || this.inputData.EndDate == "") {
                this.inputDataCheck.StartDateAndEndDateError = true;
                this.inputDataCheckErrorMsg.StartDateAndEndDateErrorMsg = "募資時間必須填妥";
            } else {
                console.log(this.inputData.StartDate);
                console.log(this.inputData.EndDate);
                this.inputDataCheck.StartDateAndEndDateError = false;
                this.inputDataCheckErrorMsg.StartDateAndEndDateErrorMsg = "";
            }
            this.checkAddVerify();
        },
        getTeamPicture(e) {
            //console.log(e.target.files[0]);
            if (e.target.files[0] == undefined) {
                this.inputDataCheck.TeamPictureError = true;
                this.inputDataCheckErrorMsg.TeamPictureErrorMsg = "團隊圖片不能為空";
            } else {
                const reader = new FileReader();
                reader.readAsDataURL(e.target.files[0]);
                reader.onload = () => {


                    Swal.fire({
                        title: '照片上傳中',
                        html: '請耐心稍等一下',
                        timer: 7000,
                        timerProgressBar: true,
                        didOpen: () => {
                            Swal.showLoading()
                        },
                        // willClose: () => {
                        //     clearInterval(timerInterval)
                        // }
                    }).then((result) => {
                        if (result.dismiss === Swal.DismissReason.timer) { }
                    })


                    this.inputData.TeamPicture = reader.result;
                }

                let formData = new FormData();
                formData.append('image', e.target.files[0]); //required
                imgSwitch = "ProfileImgUrl";


                this.uploadImg(formData, imgSwitch);


                // console.log(pmu);
                // console.log(pcu);
                // console.log(piu);
                // console.log(priu);


                this.inputDataCheck.TeamPictureError = false;
                this.inputDataCheckErrorMsg.TeamPictureErrorMsg = "";
            }
            this.checkAddVerify();
        },
        getProjectMainUrl(e) {
            //console.log(e.target.files[0]);
            if (e.target.files[0] == undefined) {
                this.inputData.ProjectMainUrl = "";
                this.inputDataCheck.ProjectMainUrlError = true;
                this.inputDataCheckErrorMsg.ProjectMainUrlErrorMsg = "專案封面不能為空";
            } else {
                const reader = new FileReader();
                reader.readAsDataURL(e.target.files[0]);
                reader.onload = () => {


                    Swal.fire({
                        title: '照片上傳中',
                        html: '請耐心稍等一下',
                        timer: 15000,
                        timerProgressBar: true,
                        didOpen: () => {
                            Swal.showLoading()
                        },
                        // willClose: () => {
                        //     clearInterval(timerInterval)
                        // }
                    })
                    // .then((result) => {
                    //     if (result.dismiss === Swal.DismissReason.timer) {}
                    // })


                    this.inputData.ProjectMainUrl = reader.result;
                }

                let formData = new FormData();
                formData.append('image', e.target.files[0]); //required
                imgSwitch = "ProjectMainUrl";
                this.uploadImg(formData, imgSwitch);

                // console.log(pmu);
                // console.log(pcu);
                // console.log(piu);
                // console.log(priu);




                this.inputDataCheck.ProjectMainUrlError = false;
                this.inputDataCheckErrorMsg.ProjectMainUrlErrorMsg = "";
            }
            this.checkAddVerify();
        },
        getProjectCoverUrl(e) {
            //console.log(e.target.files[0]);
            if (e.target.files[0] == undefined) {
                this.inputData.ProjectCoverUrl = "";
                this.inputDataCheck.ProjectCoverUrlError = true;
                this.inputDataCheckErrorMsg.ProjectCoverUrlErrorMsg = "影片封面預覽不能為空";
            } else {
                const reader = new FileReader();
                reader.readAsDataURL(e.target.files[0]);
                reader.onload = () => {
                    //console.log(reader.result);


                    Swal.fire({
                        title: '照片上傳中',
                        html: '請耐心稍等一下',
                        timer: 7000,
                        timerProgressBar: true,
                        didOpen: () => {
                            Swal.showLoading()
                        },
                        // willClose: () => {
                        //     clearInterval(timerInterval)
                        // }
                    }).then((result) => {
                        if (result.dismiss === Swal.DismissReason.timer) { }
                    })


                    this.inputData.ProjectCoverUrl = reader.result;
                }

                let formData = new FormData();
                formData.append('image', e.target.files[0]); //required
                imgSwitch = "ProjectCoverUrl";
                this.uploadImg(formData, imgSwitch);


                // console.log(pmu);
                // console.log(pcu);
                // console.log(piu);
                // console.log(priu);




                this.inputDataCheck.ProjectCoverUrlError = false;
                this.inputDataCheckErrorMsg.ProjectCoverUrlErrorMsg = "";
            }
            this.checkAddVerify();
        },

        getPlanImgUrl(e) {
            if (e.target.files[0] == undefined) {
                this.modalData.PlanImgUrl = "";
                this.modalDataCheck.PlanImgUrlError = true;
                this.modalDataCheckErrorMsg.PlanImgUrlErrorMsg = "回饋封面不能為空";
            } else {
                const reader = new FileReader();
                reader.readAsDataURL(e.target.files[0]);
                reader.onload = () => {
                    //console.log(reader.result);

                    Swal.fire({
                        title: '照片上傳中',
                        html: '請耐心稍等一下',
                        timer: 7000,
                        timerProgressBar: true,
                        didOpen: () => {
                            Swal.showLoading()
                        },
                        // willClose: () => {
                        //     clearInterval(timerInterval)
                        // }
                    })
                    // .then((result) => {
                    //     if (result.dismiss === Swal.DismissReason.timer) {}
                    // })


                    this.modalData.PlanImgUrl = reader.result;
                }

                let formData = new FormData();
                formData.append('image', e.target.files[0]); //required
                imgSwitch = "PlanImgUrl";
                this.uploadImg(formData, imgSwitch);


                // console.log(pmu);
                // console.log(pcu);
                // console.log(piu);
                // console.log(priu);


                this.modalDataCheck.PlanImgUrlError = false;
                this.modalDataCheckErrorMsg.PlanImgUrlErrorMsg = "";
            }
            this.checkAddVerifyModal();
        },
        checkAddVerify() {
            for (let index in this.inputDataCheck) {
                if (this.inputDataCheck[index] == true) {
                    this.AddVerify = false;
                    return;
                }
            }
            this.AddVerify = true;
        },
        // checkAddVerifyModal() {
        //     for (let index in this.modalDataCheck) {
        //         if (this.modalDataCheck[index] == true) {
        //             this.AddVerifyModal = false;
        //             return;
        //         }
        //     }
        //     this.AddVerifyModal = true;
        // },
        checkAddVerifyModal() {
            for (let index in this.modalDataCheck) {
                if (this.modalDataCheck[index] != false) {
                    this.AddVerifyModal = false;
                    // console.log(this.modalDataCheck[index]);
                    // console.log(this.AddVerifyModal);
                    break;
                } else {
                    this.AddVerifyModal = true;
                    // console.log(this.AddVerifyModal);
                    // console.log(this.modalDataCheck[index]);

                }
            }
            return;
        },
        onChangeYear: function (event) {
            immediate: true;
            if (this.modalData.PlanShipDateYear == "year") {
                this.modalDataCheck.PlanShipDateError = true;
                this.modalDataCheckErrorMsg.PlanShipDateErrorMsg = "請選擇年份";
            } else {
                this.modalDataCheck.PlanShipDateError = false;
                this.modalDataCheckErrorMsg.PlanShipDateErrorMsg = "";
            }
            this.checkAddVerify();
            //console.log(this.modalData.PlanShipDateYear);
            //console.log(typeof this.modalData.PlanShipDateYear);
            this.modalData.tempYear = this.modalData.PlanShipDateYear;
        },
        onChangeMonth: function (event) {
            immediate: true;
            if (this.modalData.PlanShipDateMonth == "month") {
                this.modalDataCheck.PlanShipDateError = true;
                this.modalDataCheckErrorMsg.PlanShipDateErrorMsg = "請選擇年份";
            } else {
                this.modalDataCheck.PlanShipDateError = false;
                this.modalDataCheckErrorMsg.PlanShipDateErrorMsg = "";
            }
            this.checkAddVerify();
            //console.log(this.modalData.PlanShipDateMonth);
            this.modalData.tempMonth = this.modalData.PlanShipDateMonth;
        },
        getCategory() {
            // console.log(this.AddVerify);

            if (this.inputData.Category == "專案領域") {
                this.inputDataCheck.CategoryError = true;
                this.inputDataCheck.CategoryErrorMsg = "請選擇領域";
            } else {
                this.inputDataCheck.CategoryError = false;
                this.inputDataCheck.CategoryErrorMsg = "";
            }
            // console.log(this.AddVerify);
            this.checkAddVerify();
            // console.log(this.AddVerify);
        },
        //增加回饋方案
        addItem() {
            // this.checkAddVerifyModal();
            if (this.AddVerifyModal === true) {

                // console.log(this.AddVerifyModal);

                let AddCarCarPlan;
                let AddCarCarPlanSwitch;
                let SetPlanId = "set-plan";
                this.modalData.makePlanCount += 1;
                //console.log(this.modalData.AddCarCarPlanSwitch);
                if (this.modalData.AddCarCarPlanSwitch === true) {
                    AddCarCarPlanSwitch = "是";
                    AddCarCarPlan = true;
                } else {
                    AddCarCarPlanSwitch = "否";
                    AddCarCarPlan = false;
                }
                SetPlanId += this.modalData.makePlanCount;

                if (this.modalData.PlanShipDateMonth < 10) {
                    var newMonth = "0" + this.modalData.PlanShipDateMonth;
                } else {
                    newMonth = this.modalData.PlanShipDateMonth;
                }

                if (this.modalData.QuantityLimit == 0) {
                    this.modalData.QuantityLimit == 999;
                }

                this.modalList.push({
                    ProjectPlanId: this.modalData.makePlanCount,
                    ViewId: SetPlanId,
                    makePlanCount: this.modalData.makePlanCount,
                    PlanPrice: this.modalData.PlanPrice,
                    PlanTitle: this.modalData.PlanTitle,
                    QuantityLimit: this.modalData.QuantityLimit,
                    AddCarCarPlanSwitch: AddCarCarPlanSwitch,
                    AddCarCarPlan: AddCarCarPlan,
                    PlanDescription: this.modalData.PlanDescription,
                    PlanImgUrl: piu,
                    PlanShipDateYear: this.modalData.tempYear,
                    PlanShipDateMonth: this.modalData.tempMonth,
                    PlanShipDate: this.modalData.tempYear + newMonth + "15",
                });
                // console.log(this.modalList);
                this.modalData.PlanPrice = "";
                this.modalData.PlanTitle = "";
                this.modalData.QuantityLimit = "";
                this.modalData.PlanDescription = "";
                // console.log(this.$refs.planpicfileupload.value);
                this.modalData.PlanImgUrl = "";
                this.$refs.planpicfileupload.value = null;
                this.modalData.AddCarCarPlanSwitch = false;
                this.modalData.PlanShipDateYear = "year";
                this.modalData.PlanShipDateMonth = "month";
                this.modalData.tempYear = "";
                this.modalData.tempMonth = "";
                SetPlanId = "set-plan";

                // console.log(this.modalList[0].ProjectPlanId);
                // console.log(this.modalList[1].ProjectPlanId);
                // console.log(this.modalList[0].ViewId);
                // console.log(this.modalList[1].ViewId);
                // console.log(this.modalList[0].makePlanCount);
                // console.log(this.modalList[1].makePlanCount);

                this.hideModal();
            } else {

                // console.log(this.AddVerifyModal);

                Swal.fire({
                    position: 'top',
                    icon: 'warning',
                    // type: 'warning',
                    title: '親愛的，回饋方案要填完整喔！',
                    showConfirmButton: false,
                    timer: 3000
                });
            }
        },
        //擦擦和取消重置表單
        cancelCleanModal() {
            this.modalData.PlanPrice = "";
            this.modalData.PlanTitle = "";
            this.modalData.QuantityLimit = "";
            this.modalData.PlanDescription = "";
            // console.log(this.$refs.planpicfileupload.value);
            this.modalData.PlanImgUrl = "";
            this.$refs.planpicfileupload.value = null;
            this.modalData.AddCarCarPlanSwitch = false;
            this.modalData.PlanShipDateYear = "year";
            this.modalData.PlanShipDateMonth = "month";
            this.modalData.tempYear = "";
            this.modalData.tempMonth = "";
            SetPlanId = "set-plan";
        },
        //最後提交
        submitProposal() {

            // for (i = 1; i <= editorImgId; i++) {
            //     document.querySelector(`#editorImgId${i}`).src = imgurArray[i - 1];
            // }

            // console.log(this.AddVerify);

            if (this.AddVerify == true) {
                // console.log(this.AddVerify);


                const swalWithBootstrapButtons = Swal.mixin({
                    customClass: {
                        confirmButton: 'btn btn-outline-danger ml-2',
                        cancelButton: 'btn btn-secondary mr-2'
                    },
                    buttonsStyling: false
                })

                swalWithBootstrapButtons.fire({
                    title: '確定提交?',
                    text: "一旦提交就不可返回",
                    icon: 'warning',
                    showCancelButton: true,
                    confirmButtonText: '確定',
                    cancelButtonText: '返回',
                    reverseButtons: true
                }).then((result) => {
                    if (result.isConfirmed) {

                        var SwalColors = {
                            red: "rgba(250, 50, 50, 0.45)",
                            green: "rgba(50, 250, 50, 0.45)",
                            gray: "#ECF0F1",
                            white: "rgba(255, 255, 255, 1)",
                        };

                        function SwalOverlayColor(color) {
                            setTimeout(function () {
                                $(".swal2-container").css({
                                    "background-color": SwalColors[color]
                                });
                            }, 200);
                        }

                        Swal.fire({
                            title: '提案資料提交中',
                            html: '資料將會匯入到我們的資料中心，請耐心稍等一下',
                            timer: 50000,
                            timerProgressBar: true,
                            background: '#FDC6C8',
                            didOpen: () => {
                                SwalOverlayColor("gray");
                                Swal.showLoading();
                            },
                        })
                        this.saveSubmissionToServer();

                    } else if (

                        result.dismiss === Swal.DismissReason.cancel
                    ) {
                        swalWithBootstrapButtons.fire(
                            '沒問題！繼續填寫',
                        )
                    }
                })

            } else {

                // console.log(this.AddVerify);

                Swal.fire({
                    icon: 'warning',
                    title: '親愛的，專案提交要填完整喔！',
                    showConfirmButton: false,
                    timer: 3000
                });

            }

        },
        //富文本以外的上傳
        uploadImg(formData, imgSwitch) { //479-481行
            // $.ajax({
            //     url: "/api/projectsubmission/uploadfiles",
            //     type: "post",
            //     //contentType: "application/json; charset=utf-8",
            //     data: formData,
            //     method: 'post',
            //     processData: false,
            //     contentType: false,
            //     success: function (response) {

            //         console.log(response);

            //         if (imgSwitch == "ProjectMainUrl") {
            //             pmu = response;
            //         } else if (imgSwitch == "ProjectCoverUrl") {
            //             pcu = response;
            //         } else if (imgSwitch == "PlanImgUrl") {
            //             piu = response;
            //         } else {
            //             priu = response;
            //         }

            //         //成功就跳swal
            //         Swal.fire({
            //             position: 'top',
            //             icon: 'success',
            //             title: '成功',
            //             showConfirmButton: false,
            //             timer: 1500
            //         });

            //     },
            //     error: function () {
            //         console.log(imgSwitch);



            //         //失敗就跳swal
            //         Swal.fire({
            //             position: 'top',
            //             icon: 'error',
            //             title: '上傳失敗',
            //             showConfirmButton: false,
            //             timer: 1500
            //         });

            //     }
            // });

            //axios方法
            axios({
                method: 'POST',
                url: 'https://api.imgur.com/3/image',
                data: formData,
                headers: {
                    Authorization: "Bearer " + token,

                    //放置剛剛申請的Client-ID
                },
                mimeType: 'multipart/form-data'
            }).then(res => {
                console.log(res)
                console.log(res.data.data.link);

                if (imgSwitch == "ProjectMainUrl") {
                    pmu = res.data.data.link;
                } else if (imgSwitch == "ProjectCoverUrl") {
                    pcu = res.data.data.link;
                } else if (imgSwitch == "PlanImgUrl") {
                    piu = res.data.data.link;
                } else {
                    priu = res.data.data.link;
                }

                //成功就跳swal
                Swal.fire({
                    position: 'top',
                    icon: 'success',
                    title: '成功',
                    showConfirmButton: false,
                    timer: 1500
                });


            }).catch(e => {
                console.log(e)

                //失敗就跳swal
                Swal.fire({
                    position: 'top',
                    icon: 'error',
                    title: '上傳失敗',
                    showConfirmButton: false,
                    timer: 1500
                });

            })
        },
        //點儲存讓 modal 消失
        hideModal() {
            $(".modal").modal("hide");
        },
        //刪除Plan重新刷index
        deletePlan(index) {
            this.modalList.splice(index, 1);
            this.modalList.forEach((el, index) => {
                el.ProjectPlanId = index;
                el.makePlanCount = index;
                el.ViewId = "set-plan" + index;
                // console.log(el.ProjectPlanId);
                // console.log(el.makePlanCount);
                // console.log(el.ViewId);
            });

        },
        saveSubmissionToServer() {

            // console.log(this.AddVerify);

            this.inputData.QuillHtml = splitJoin;
            // console.log(this.inputData.QuillHtml);

            this.modalList.shift(); //移掉陣列第一個空的
            this.ProjectQuestionAnswer.shift(); //也是

            // console.log(this.inputData.StartDate.split("-").join(""));
            // console.log(this.inputData.EndDate.split("-").join(""));

            var totalQuestion = "";
            var totalAnswer = "";

            this.ProjectQuestionAnswer.forEach(x => {
                totalQuestion = totalQuestion + "," + x.Question;
                totalAnswer = totalAnswer + "," + x.Answer;
            });
            totalQuestion = totalQuestion.substr(1);
            totalAnswer = totalAnswer.substr(1);

            var date = new Date();

            var UpLoadData = {
                "ProjectName": this.inputData.ProjectName,
                "AmountThreshold": this.inputData.AmountThreshold,
                "Category": this.inputData.Category,
                "StartDate": this.inputData.StartDate.split("-").join(""),
                "EndDate": this.inputData.EndDate.split("-").join(""),
                "ProjectVideoUrl": this.inputData.ProjectVideoUrl,
                "ProjectMainUrl": pmu,
                "ProjectCoverUrl": pcu,
                "ProjectPrincipal": this.inputData.ProjectPrincipal,
                "MemberConEmail": this.inputData.MemberConEmail,
                "MemberPhone": this.inputData.MemberPhone,
                "IdentityNumber": this.inputData.IdentityNumber,
                "ProfileImgUrl": priu,
                "CreatorName": this.inputData.MemberName,
                "AboutMe": this.inputData.AboutMe,
                "MemberWebsite": this.inputData.MemberWebsite,
                "ProjectImgUrl": this.inputData.QuillHtml, //富文本
                "PlanObject": this.modalList, //陣列包物件
                "ProjectQA": this.ProjectQuestionAnswer, //陣列包物件
                "Project_Question": totalQuestion,
                "Project_Answer": totalAnswer,
                "CreatedDate": date.toJSON(),
                "SubmittedDate": date.toJSON(),
                "LastEditTime": date.toJSON(),
                "ApprovingStatus": 1,
                "ProjectStatus": 0,
            }
            // console.log(this.ProjectQuestionAnswer);

            $.ajax({
                url: "/api/projectsubmission/receivedata",
                type: "post",
                //contentType: "application/json; charset=utf-8",
                data: UpLoadData,
                success: function (response) {
                    Swal.fire({
                        position: 'top',
                        icon: 'success',
                        title: '成功',
                        html: '已提交到我們的資料中心，後續會有專人與您聯絡',
                        showConfirmButton: false,
                        timer: 3000
                    });


                    setTimeout(() => {
                        window.location.href = "/Home/Index/";
                    }, 6000)

                },
                error: function (response) {
                    Swal.fire({
                        position: 'top',
                        icon: 'error',
                        title: '上傳失敗',
                        showConfirmButton: false,
                        timer: 3000
                    });

                    setTimeout(() => {
                        window.location.href = "/Home/Index/";
                    }, 6000)
                }
            });
        }
    }
});




//quill 編輯器設定
var options = {
    modules: {
        toolbar: [
            [{
                header: [1, 2, 3, false]
            }],
            ['bold', 'italic', 'underline'],
            ['image', 'video'],
            [{
                list: 'ordered'
            }, {
                list: 'bullet'
            }],
            [{
                'color': []
            }, {
                'background': []
            }],
        ]
    },
    theme: 'snow',
};

// 編輯器 new 出來
var quill = new Quill('#editor', options);
quill.formatLine(4, 4, 'align', 'center');
quill.format(
    'color', 'black');

quill.on('text-change', function () {
    //splitJoin = quill.root.innerHTML.split("  ").join(" &nbsp;");
    splitJoin = quill.root.innerHTML;
});


quill.getModule("toolbar").addHandler("image", () => {
    this.selectLocalImage();
});

function selectLocalImage() {
    editorImgId++;
    var input = document.createElement("input");
    input.setAttribute("type", "file");
    input.click();

    //監聽本地圖片上傳 和 上傳server
    input.onchange = () => {
        const file = input.files[0];

        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => {

            //塞 base64 在富文本上顯示
            var base64 = reader.result;
            var img = document.createElement("img");
            var qlEditor = document.querySelector(".ql-editor");
            img.src = base64;
            img.id = `editorImgId${editorImgId}`;
            qlEditor.appendChild(img);

        }

        // file type is only image.
        if (/^image\//.test(file.type)) {

            Swal.fire({
                title: '照片上傳中',
                html: '請耐心稍等一下',
                timer: 20000,
                timerProgressBar: true,
                didOpen: () => {
                    Swal.showLoading()
                    // timerInterval = setInterval(() => {
                    //     const content = Swal.getContent()
                    //     if (content) {
                    //         const b = content.querySelector('b')
                    //         if (b) {
                    //             b.textContent = Swal.getTimerLeft()
                    //         }
                    //     }
                    // }, 100)
                },
                // willClose: () => {
                //     clearInterval(timerInterval)
                // }
            }).then((result) => {
                /* Read more about handling dismissals below */
                if (result.dismiss === Swal.DismissReason.timer) {
                    // console.log('I was closed by the timer')
                }
            })


            //上傳的時候跳swal
            // Swal.fire({
            //     position: 'top-end',
            //     icon: 'success',
            //     title: '上傳中..',
            //     showConfirmButton: false,
            //     timer: 6000
            // });

            //在這邊再去上傳server
            this.saveToServer(file, "image");

        } else {

            //上傳的時候跳swal
            Swal.fire({
                position: 'top',
                icon: 'warning',
                // type: 'warning',
                title: '親愛的，只能上傳圖片喔',
                showConfirmButton: false,
                timer: 3000
            });

            console.warn("親愛的，只能上傳圖片喔");

        }
    };
}


function saveToServer(file) {
    // this.file = e.target.files[0]; // input type="file" 的值
    var name = file.name; // input的圖檔名稱
    var size = Math.floor(file.size * 0.001) + 'KB'; // input的圖片大小
    var thumbnail = window.URL.createObjectURL(file); // input的圖片縮圖
    var title = name; // 預設 input 的圖檔名稱為圖片上傳時的圖片標題


    let form = new FormData();
    form.append('image', file);
    form.append('title', title);
    // form.append('description', des);
    form.append('album', album); // 有要指定的相簿就加這行

    console.log(form);

    $.ajax({
        async: true,
        crossDomain: true,
        processData: false,
        contentType: false,
        type: 'post',
        url: 'https://api.imgur.com/3/image',
        headers: {
            Authorization: 'Bearer ' + token
        },
        mimeType: 'multipart/form-data',
        data: form,
        success: function (res) {

            console.log(res); // 可以看見上傳成功後回的值
            var jsonObj = JSON.parse(res); //轉json物件為了取裡面的東西

            // alert('上傳完成，稍待一會兒就可以在底部的列表上看見了。');
            url = jsonObj.data.link; //拿imgur link 從json物件裡面取
            imgurArray.push(url);
            console.log(imgurArray);

            //塞 imgurUrl
            var img = document.getElementById(`editorImgId${editorImgId}`);
            img.setAttribute("data-imgururl", url);
            img.src = url;
            const range = quill.getSelection();
            quill.setSelection(range.index + 2);

            //成功就跳swal
            Swal.fire({
                position: 'top',
                icon: 'success',
                title: '成功',
                showConfirmButton: false,
                timer: 1500
            });


        },
        error: function () {

            //失敗就跳swal
            Swal.fire({
                position: 'top',
                icon: 'error',
                title: '上傳失敗',
                showConfirmButton: false,
                timer: 1500
            });
        }
    })


    //axios方法
    // axios({
    //     method: 'POST',
    //     url: 'https://api.imgur.com/3/image',
    //     data: form,
    //     headers: {
    //         Authorization: "Bearer " + token,

    //         //放置你剛剛申請的Client-ID
    //     },
    //     mimeType: 'multipart/form-data'
    // }).then(res => {
    //     console.log(res)
    // }).catch(e => {
    //     console.log(e)
    // })




    // const config = {
    //     type: "post",
    //     url: "https://api.imgur.com/3/image",
    //     data: form,
    //     headers: {
    //         Authorization: 'Bearer ' + token,
    //         // contentType: 'application/x-www-form-urlencoded',
    //         "Content-type": "multipart/form-data",
    //         "Access-Control-Allow-Origin": "*",
    //         'Access-Control-Allow-Methods': "GET,PUT,POST,DELETE,PATCH,OPTIONS",
    //         "Access-Control-Allow-Credentials": "true",
    //         "Access-Control-Allow-Headers": "Access-Control-Allow-Headers, Origin,Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers",
    //     },
    // }
    // axios.request(config)
    //     .then(function (response) {
    //         console.log(response.data[0]);
    //     })
    //     .catch((error) => {
    //         console.log("失敗");
    //     })


    //------------------------------------------------

    // const headers = {
    //     async: true,
    //     crossDomain: true,
    //     processData: false,
    //     contentType: 'application/x-www-form-urlencoded',
    //     Authorization: 'Bearer ' + token,

    //     // mimeType: 'multipart/form-data',
    // }
    // // axios.defaults.headers.post['Content-Type'] ='application/x-www-form-urlencoded';

    // axios.post('https://api.imgur.com/3/image', form, {
    //     headers: headers
    // })
    // .then((response) => {
    //     console.log(response.data[0]);
    // })
    // .catch((error) => {
    //     console.log("失敗");
    // })


}

        //---------------------------------------------//
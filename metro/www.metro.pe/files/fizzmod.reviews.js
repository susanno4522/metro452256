/* Update on: 26/01/2018 11:08:47 Metrofood */
"use strict";!function(e,i,r,t,s){var n={MDReviewsEntity:"RE",productId:null,reviewsCache:{},user:{},url:{GETPROFILE:"/no-cache/profileSystem/getProfile",LOGIN:"/login"},events:{READY:"Fizzmod.Reviews.Ready",REVIEWS_UPDATED:"Fizzmod.Reviews.Updated"},errors:{productIdNotDefined:"'productId' is not defined",reviewsNotDefined:"'reviews' is not defined",ratingNotDefined:"'rating' is not defined",ratingNotValid:"'rating' must be a number between 1 and 5",titleNotDefined:"'title' is not defined",userNotDefined:"'user' is not defined",userHasNoReview:"user has no active review",reviewUserIdNotDefined:"'reviewUserId' is not defined",reviewUserIdNotFound:"The 'reviewUserId' was not found in reviews"},init:function(i,r){var t=this;if(!i)return this._error("productIdNotDefined");this.productId=i;var s=[],n=this.getReviews();if(s.push(n),this._isValidUser(r))this.user=r;else{var o=e.get(this.url.GETPROFILE);s.push(o)}return e.when.apply(e,s).then(function(){for(var e=arguments.length,i=Array(e),r=0;r<e;r++)i[r]=arguments[r];if(2===i.length){var s=i[1][0];t._isValidUser(s)&&(t.user=s)}t._trigger(t.events.READY,[t.reviewsCache,t.user])}),this},_trigger:function(i,r){e(t).trigger(i,r)},_error:function(e,i){console.log(this.errors[e]),i&&console.log("Data:",i)},_isValidUser:function(e){return!!e&&!!e.IsUserDefined},_updateUserReview:function(r){var t=this;if(!r)return this._error("reviewsNotDefined");if(!this.isLoggedIn())return this._error("userNotDefined");if(!this.reviewsCache[this.user.UserId]){var s=this.reviewsCache[this.user.UserId]={helpfull:{yes:[],no:[]}},n=this.user.Email.match("@");n=null!=n?n[0].toString():this.user.Email,s.name=n,this.user.FirstName&&(s.name=this.user.FirstName),this.user.LastName&&(s.name+=" "+this.user.LastName)}e.extend(this.reviewsCache[this.user.UserId],r);var o=JSON.stringify(this.reviewsCache),u=i.MasterData.insertUpdate(this.productId,{reviews:o},this.MDReviewsEntity);return u.done(function(e){return t._trigger(t.events.REVIEWS_UPDATED,JSON.parse(e.getResults().reviews))}),u},login:function(){var i=this;if("undefined"!=typeof vtexid)vtexid.start(),e(document).on("click",".vtexIdUI-close",function(e){i.redirectOnLoginFail&&(document.referrer?t.location.href=document.referrer:t.location.href="/")});else{var r="/"+t.location.href.split("/").splice(3).join("/");t.location.href=this.url.LOGIN+"?ReturnUrl="+r}},isLoggedIn:function(){return!!this.user&&!!this.user.IsUserDefined},hasComments:function(){if(e.isEmptyObject(this.reviewsCache))return!1;var i=!0;for(var r in this.reviewsCache)if(this.reviewsCache[r].body&&this.reviewsCache[r].active){i=!1;break}return!i},getReviews:function(){var e=this,r=arguments.length>0&&void 0!==arguments[0]?arguments[0]:this.productId;if(!r)return this._error("productIdNotDefined");var t=i.MasterData.get(r,["reviews"],this.MDReviewsEntity);return t.done(function(i){var r=i.getResults(),t={};r&&r.reviews&&"string"==typeof r.reviews&&(t=JSON.parse(r.reviews)),e.reviewsCache=t,e._trigger(e.events.REVIEWS_UPDATED,t)}),t},publishRating:function(i){if(!this.isLoggedIn())return this.login();if(!i)return this._error("ratingNotDefined");if(e.isNumeric(i)||(i=parseInt(i,10)),i>5||i<1)return this._error("ratingNotValid");var r={rating:i};return this._updateUserReview(r)},publishTitle:function(e){if(!this.isLoggedIn())return this.login();if(!e)return this._error("titleNotDefined");var i={title:e};return this._updateUserReview(i)},publishBody:function(e){if(!this.isLoggedIn())return this.login();if(!e)return this._error("bodyNotDefined");var i={body:e};return this._updateUserReview(i)},submitReview:function(){if(!this.isLoggedIn())return this.login();var e=this.reviewsCache[this.user.UserId];if(!e)return this._error("userHasNoReview");if(!e.rating)return this._error("ratingNotDefined");if(!e.title)return this._error("titleNotDefined");if(!e.body)return this._error("bodyNotDefined");var i=new Date,r={active:!0,date:i};return this._updateUserReview(r)},voteHelpfullReview:function(e){if(!this.isLoggedIn())return this.login();if(!e)return this._error("reviewUserIdNotDefined");if(!this.reviewsCache[e])return this._error("reviewUserIdNotFound");var i=this.reviewsCache[e],r=i.helpfull;return r.yes.indexOf(this.user.UserId)==-1&&r.yes.push(this.user.UserId),r.no.indexOf(this.user.UserId)!=-1&&r.no.splice(r.no.indexOf(this.user.UserId),1),this._updateUserReview(i)},voteUnhelpfullReview:function(e){if(!this.isLoggedIn())return this.login();if(!e)return this._error("reviewUserIdNotDefined");if(!this.reviewsCache[e])return this._error("reviewUserIdNotFound");var i=this.reviewsCache[e],r=i.helpfull;return r.no.indexOf(this.user.UserId)==-1&&r.no.push(this.user.UserId),r.yes.indexOf(this.user.UserId)!=-1&&r.yes.splice(r.yes.indexOf(this.user.UserId),1),this._updateUserReview(i)}};i.Reviews=n}(jQuery,Fizzmod,vtexjs.checkout,window);

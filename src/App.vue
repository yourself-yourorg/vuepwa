<template>
  <div id="app" class="mdl-layout mdl-js-layout mdl-layout--fixed-header"  style="border: 2px solid #A26CD5;">
    <!-- Main container -->
    <nav class="level">
      <!-- Left side -->
      <div class="level-left">
        <div class="level-item">
          <img
            src="static/img/Copyright-uncertain.png" alt="Demo of a microservice SPA PWA">
        </div>
      </div>

      <!-- Right side -->
      <div class="level-right">
        <div class="level-item">
          <a class="button">
            <span class="icon">
              <i class="fas fa-edit"></i>
            </span>
            <span>Sign Up</span>
          </a>
          <a class="button">
            <span class="icon">
              <i class="fas fa-sign-in-alt"></i>
            </span>
            <span>Sign In</span>
          </a>
        </div>
      </div>
    </nav>

    <nav class="panel">
      <p class="panel-heading">
        repositories
      </p>
      <div class="panel-block">
        <p class="control has-icons-left">
          <input class="input is-small" type="text" placeholder="search">
          <span class="icon is-small is-left">
            <i class="fa fa-search"></i>
          </span>
        </p>
      </div>
      <p class="panel-tabs">
        <a class="is-active">all</a>
        <a>public</a>
        <a>private</a>
        <a>sources</a>
        <a>forks</a>
      </p>
      <a class="panel-block is-active">
        <span class="panel-icon">
          <i class="fas fa-book"></i>
        </span>
        bulma
      </a>
      <a class="panel-block">
        <span class="panel-icon">
          <i class="fa fa-book"></i>
        </span>
        marksheet
      </a>
      <a class="panel-block">
        <span class="panel-icon">
          <i class="fa fa-book"></i>
        </span>
        minireset.css
      </a>
      <a class="panel-block">
        <span class="panel-icon">
          <i class="fa fa-book"></i>
        </span>
        jgthms.github.io
      </a>
      <a class="panel-block">
        <span class="panel-icon">
          <i class="fa fa-code-branch"></i>
        </span>
        daniellowtw/infboard
      </a>
      <a class="panel-block">
        <span class="panel-icon">
          <i class="fa fa-camera-retro"></i>
        </span>
        mojs
      </a>
      <label class="panel-block">
        <input type="checkbox">
        remember me
      </label>
      <div class="panel-block">
        <button class="button is-link is-outlined is-fullwidth">
          reset all filters
        </button>
      </div>
    </nav>


    <div class="mdl-layout__drawer">
      <span class="mdl-layout-title">CropChat</span>
      <div class="mdl-navigation">
        <router-link class="mdl-navigation__link" to="/" @click.native="hideMenu">Home</router-link>
        <router-link class="mdl-navigation__link" to="/post" @click.native="hideMenu">Post a picture</router-link>
      </div>
    </div>
    <main class="mdl-layout__content">
      <div class="page-content">
        <router-view></router-view>
      </div>
    </main>
  </div>
</template>

<style>
  @import url('https://use.fontawesome.com/releases/v5.0.6/css/all.css');
</style>

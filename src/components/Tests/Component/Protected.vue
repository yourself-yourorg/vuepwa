<template>
  <div style="margin-left: 30px">
    <h1>Some Protected Sections!</h1>
    <ol>
      <li>
        <h3>Read-only view</h3>
        <p style="margin-left: 30px" v-show="$isAllowed('toSee')">
          You are allowed to see this text.
        </p>
      </li>
      <li>
        <h3>Limited Edits</h3>
        <p style="margin-left: 30px" v-show="$isAllowed('minorEdits')">
          You are allowed to make some edits.
        </p>
      </li>
      <li>
        <h3>Any Edits</h3>
        <p style="margin-left: 30px" v-show="$isAllowed('allEdits')">
          You are allowed any edits of this resource.
        </p>
      </li>
      <li>
        <h3>Alter Privileges</h3>
        <p style="margin-left: 30px" v-show="$isAllowed('toChangeAuthorizations')">
          You are allowed to control access to this resource.
        </p>
      </li>
    </ol>
    <hr />
    <p>Unprotected text</p>

    <p v-show="$isAllowed('viewParagraph')">Protected text!</p>
 
    <hr />
    <router-link class="button is-small is-link is-outlined" v-bind:to="{name: 'home'}">
      <icon name="arrow-circle-up" />
      &nbsp;Home
    </router-link>
    <router-link class="button is-small is-link is-outlined" v-bind:to="{name: 'classified'}">
      <icon name="arrow-circle-right" />
      &nbsp;Classified
    </router-link>
  </div>
</template>

<script>
import { Perimeters as acl } from '@/accessControl';

export default {
  perimeters: [acl.protectedPerimeter],
};
</script>

<template>
    <div class-="index">
        <h1>Welcome!</h1>

        <div class="todo-author">
            BY - <span>{{$t('authorTeam')}}</span>: <span>{{$t('authorList')}}</span>
        </div>
    </div>
</template>

<script>

export default {
    name: 'Index'
};
</script>

<style>
.todo-author {
    color: rgba(255, 255, 255, 0.1);
    text-shadow: -1px -1px rgba(0, 0, 0, 0.5);
    text-rendering: optimizeLegibility;
}
</style>

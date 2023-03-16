<template>
    <div class="box">
        <form @submit.prevent="$emit('getId', accountName)">
        <div class="form-group">
          <label for="name">계정 이름</label>
          <input type="text" id="name" v-model="accountName" required>
        </div>
        <div class="form-group">
          <button type="submit">클로저스 접속!</button>
        </div>
      </form>
    </div>
  </template>

<script>
export default {
  data() {
    return {
      accountName: '',
    };
  }
};
</script>

<style>
  .box {
    max-width: 800px;
    margin: 0 auto;
    padding: 20px;
    text-align: center;
  }
  h1 {
    font-size: 32px;
    margin-bottom: 20px;
  }
  form {
    display: flex;
    flex-direction: column;
    align-items: center;
  }
  .form-group {
    margin-bottom: 10px;
  }
  label {
    display: block;
    font-size: 16px;
    margin-bottom: 5px;
  }
  input[type="text"] {
    width: 100%;
    max-width: 400px;
    height: 40px;
    padding: 5px 10px;
    border: 1px solid #ccc;
    border-radius: 4px;
    font-size: 16px;
  }
  button[type="submit"] {
    background-color: #007bff;
    color: #fff;
    border: none;
    border-radius: 4px;
    padding: 10px 20px;
    font-size: 16px;
    cursor: pointer;
    transition: background-color 0.2s;
  }
  button[type="submit"]:hover {
    background-color: #0069d9;
  }
  .record-list {
    margin-top: 20px;
    text-align: left;
  }
  .record-item {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 10px 20px;
    border: 1px solid #ccc;
    border-radius: 4px;
    margin-bottom: 10px;
  }
  .record-item .name {
    font-weight: bold;
  }
  .record-item .dungeon {
    color: #777;
  }
  .record-item .time
{
    color: #777;
    font-size: 14px;
}
</style>
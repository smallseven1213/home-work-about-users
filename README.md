# Tasks Details

## Performance Check

You are given a React component that fetches and displays a list of users in real time. It also have a counting button logic, click one time add one. However, it has performance issues.
Questions:

- What are the performance issues in the following component?
- How would you optimize it?
- Rewrite the component with your optimizations.

```
// Problematic Code:
import React, { useState, useEffect } from "react";
const UserList = () => {
  const [users, setUsers] = useState([]);
  const [count, setCount] = useState(0);
  useEffect(() => {
    fetch("https://api.example.com/users")
      .then((res) => res.json())
      .then((data) => setUsers(data));
  }, []);
  return (
    <div>
      <h2>User List</h2>
      <button onClick={() => setCount(count + 1)}>Increment: {count}</button>
      <ul>
        {users.map((user) => (
          <li key={user.id}>{user.name}</li>
        ))}
      </ul>
    </div>
  );
};
export default UserList;
```

# 啟動方式
- pnpm install
- pnpm run dev

# 效能優化 - Basic

## 切割Counter與Users，阻止觸發沒必要的rerender
原代碼中有Counter與Users 2個不同功能在同一個Component中，邏輯上不應該將其依賴在同一個Component中。也因為count state被更新而會觸發render，影響到了完全無關的users list
```
// solution
實作切開為 Counter與Users 兩個Component，使其不相關的state不會影響彼此的渲染。
同樣設計模式，也可以用來設計大型Form中的各個input的變化，類似react-hook-form的Controller
```

## Counter的onClick事件優化
```
// Solution
將() => setCount(count + 1)改為 () => setCount(c => c + 1)
防止連擊可能會造成的錯誤
```

## 利用Virtualized Window，不一次渲染全部User資料
users的呈現上，在模擬出一萬筆資料進來後，可看到大量資料在畫面更新時造成卡頓
```
// Solution
為了防止全部DOM被渲染，使用@tanstack/react-virtual實作虛擬化列表，套件會協助算出畫面上需要的筆數，減少DOM節點來避開不必要的reflow
(原本我有採用react-virtualized的WindowScroller，但我近一年沒實作這塊，發現了@tanstack team有更好的方案且實測效能更佳，因此更新版本採用)

```

## 畫面抖動與UIUX改良
原程式碼中對於api回傳的狀態處理細節不多，且在原程式佈局在資料改變狀況下，會造成畫面抖動
```
// Solution
增加了fetch user時的error handler與loading處理。
並修改style，使其以上往下排序，資料改變時不出現抖動
```

## 其它補充
- 在Counter中的 button onClick 中會呼叫 () => setCount(c => c + 1)，此行為無法再造成子元件的side effect，因此沒有封裝為useCallback，除非有要將function傳入到child component的需求，才會考慮是否使用useCallback並封裝為increaseCount()
- 強化整個專案資料結構，並設計可被共用的VitrualizedUsers與NormalUsers兩種列表，這兩者可替換資料來源為useDefaultUsers或useSWRUsers
- 資料源 https://api.example.com/users 是假的，因此調整成稍微小型的正式架構並使其可以運作，實作 services/userServices.ts 模擬呼叫API，return 100萬筆資料的假資料。
- 如果在大型正式環境，會另外實作api_client以及使用axios做interceptors等處理以及token等較複雜的業務邏輯。實際做到每個function都無依賴性，且容易撰寫unit test的狀況。在本題就不再交待此狀況。
- 面試時有提到tailwindcss優點，本專案包出來的css只有3.6kb(gzip)，也無需經由react runtime去執行相關styling
- NavigationBar使用motion優化畫面體驗
- 利用code split並實作lazy import頁面與小型component


# 效能優化 - PRO

## Cache資料實作
沒有實作cache讓畫面先出現令使用者安心
```
// Solution
採用useSWR進行api query以及cache機制，可以發現在demo畫面切換basic與pro時，pro總時會出現cache的data
```

## 其它可以強化的地方
- 本次模擬一次100萬筆非常大量，在現實狀況中，我會請後端RD進行api調整，使用cursor-base的分頁模式來做出inifinity scroll。
- 如果Users中的資料會經常update，目前陣列型資料將會對渲染造成較大壓力，我會將users資料透過normalizr套件將Users轉成key value格式，或修改API格式，在此資料結構下可以有較佳的單筆user更新效能。有助於提升刪除時、本地端修改(類似excel)或web端update時的渲染效能

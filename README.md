# react-sortable-condition
> drag and drop sortable condition

[![npm](https://img.shields.io/npm/v/react-sortable-condition?style=for-the-badge)](https://github.com/JiangWeixian/reactx) [![NPM](https://img.shields.io/npm/l/react-sortable-condition?style=for-the-badge)](https://github.com/JiangWeixian/reactx)

- [react-sortable-condition](#react-sortable-condition)
    - [Screenshots](#screenshots)
    - [Install](#install)
    - [Usage](#usage)
    - [Data Structure](#data-structure)
    - [Rules](#rules)
    - [API](#api)
    - [Themes](#themes)

### Screenshots

![sortablecondition](https://github.com/JiangWeixian/react-sortable-condition/blob/master/docs/screenshots/react-sortable-condition.gif)

### Install

`npm install react-sortable-condition --save`

### Usage

```jsx
<SortableCondition
  defaultDataSource={data}
  onChange={v => console.log('change', v)}
  onDragState={v => console.log('drag', v)}
  onVisible={v => console.log('visible', v)}
  onMoveNode={v => console.log('move', v)}
  maxDepth={3}
>
  <SortableCondition.Condition
    onAdd={() => console.log('add')}
    onDelete={() => console.log('delelte')}
    addIcon={<Icon type="plus-circle" />}
    deleteIcon={<Icon type="close-circle" />}
  />
  <SortableCondition.Pattern>
    <TestPattern />
  </SortableCondition.Pattern>
</SortableCondition>
```

- see real demo in [example](https://github.com/JiangWeixian/react-sortable-condition/tree/master/example/src/pages/condition-prod/index.tsx)
- see how to work with **react-hooks** in [useTreeData-example](https://github.com/JiangWeixian/react-sortable-condition/tree/master/example/src/pages/condition-prod/hook.tsx)
- see more api in [api-chapter](###api)

### Data Structure

**condition data structure**

```js
{
  type: 'and' | 'or'
  expanded: boolean
  children: condition-data-structure[] | pattern-data-structure[] | undefined
}
```

**pattern data structure**

```js
{
  type: 'normal',
  expanded: boolean
  patterns: any // data for pattern
  children: undefined
}
```

### Rules

1. pattern's data no chidlren data
2. condition's children at least one
3. convert only available with no-siblingitems-node
4. cant't delete root node
5. drag condition node to all-pattern-children'node will spreed condition's pattern children
6. drag pattern node to all-condition-childrn'node will convert pattern node to condition node
7. children is always same kinds

### API
> all typo in [typings](./components/sortable-condition/typings/index.tsx)

**Props of Sortablecondition**

| Props<T>          | Usage                                                               | Typo                                  | Default |
| :---------------- | :------------------------------------------------------------------ | :------------------------------------ | :------ |
| onDragState       | trigger when drag start and end                                     | (value: DragStateData<T>): void       |         |
| onMoveNode        | trigger when moved node                                             | (value: MoveStateData<T>): void       |         |
| onVisible         | trigger when expaned node                                           | (value: VisibilityStateData<T>): void |         |
| onChange          | trigger by treeData change behaviours                               | (value: ConditionTreeItem<T>[]): void |         |
| children          | `<Condition />` or `<Pattern />`                                    |                                       |         |
| dataSource        | set fullcontrol datasource, generate by **useTreeData hooks**       | ConditionTreeItem<T>[]                |         |
| defaultDataSource | set un-fullcontrol initial datasource                               | DataItem<T>[]                         | []      |
| maxDepth          | set max-depth of sortable-condition                                 | number                                | 3       |
| className         | set classname of SortableCondition                                  | string                                |         |
| rowHeight         | set node rowheight, will overwrite condition and pattern row height | number                                | 62      |

**Props of Sortablecondition.Condition**

| Props<T>  | Usage                                              | Typo                                             | Default |
| :-------- | :-------------------------------------------------- | :----------------------------------------------- | :------ |
| onAdd     | trigger when add condition node                     | (node: ConditionItem<T>, path: NextPath) => void |         |
| onDelete  | trigger when delete condition node                  | (node: ConditionItem<T>, path: NextPath) => void |         |
| onType    | trigger when change condition node type             | (node: ConditionItem<T>, path: NextPath) => void |         |
| onConvert | trigger when convert condition node to pattern node | (node: ConditionItem<T>, path: NextPath) => void |         |
| className | set classname of Condition                          | string                                           |         |
| rowHeight | set condition rowheight                             | number                                           | 62      |
| indent    | set width between line and node                     | number                                           | 44      |

**Props of Sortablecondition.Pattern**

| Props<T>  | Usage                                              | Typo                                           | Default             |
| :-------- | :-------------------------------------------------- | :--------------------------------------------- | :------------------ |
| onAdd     | trigger when add pattern node                       | (node: PatternItem<T>, path: NextPath) => void |                     |
| onDelete  | trigger when delete pattern node                    | (node: PatternItem<T>, path: NextPath) => void |                     |
| onType    | trigger when change pattern node type               | (node: PatternItem<T>, path: NextPath) => void |                     |
| onConvert | trigger when convert pattern node to condition node | (node: PatternItem<T>, path: NextPath) => void |                     |
| className | set classname of Pattern                            | string                                         |                     |
| children  | set render pattern in Pattern                       | React.ReactNode                                | 'this is a pattern' |
| rowHeight | set pattern rowheight                               | number                                         | 62                  |

**Note:** Pattern.children see like below, `TestPattern` will get `patterns` from `treeData`

```ts
const TestPattern = ({ patterns, onChange }: { patterns?: any; onChange?: Function }) => {
  console.log('patterns', patterns)
  const handleClick = () => {
    console.log('clicked')
    if (onChange) {
      onChange({ patterns: 2 })
    }
  }
  return <span onClick={handleClick}>1</span>
}
```

**Usage of useTreeData hooks**

| Params<T>       | Usage           | Typo          | Defalut |
| :-------------- | :--------------- | :------------ | :------ |
| initialTreeData | initial treedata | DataItem<T>[] |         |

| Return<T> | Usage                                                                                                                                                                                               | Typo                   | Defalut |
| :-------- | :--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | :--------------------- | :------ |
| treeData  | datasouce of `<SortableCondition />`                                                                                                                                                                 | ConditionTreeData<T>[] |         |
| dispatch  | the way of how to change treeData, see dispatch [params]([./components/sortable-condition/typings/index.tsx](https://github.com/JiangWeixian/react-sortable-condition/blob/themes/themes/antd.styl)) | React.Dispatch         |         |

### Themes

- [antd](https://github.com/JiangWeixian/react-sortable-condition/blob/master/themes/antd.styl) - just import this files

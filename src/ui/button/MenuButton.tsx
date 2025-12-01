import React, { Component } from "react";
import { Button, Flex, Dropdown, MenuProps } from "antd";
import { getAllCategories } from "../../data/clothesData";
import { DEFAULT_CLOTH_TYPE } from "../../utils/constants";
import { MenuButtonProps, MenuButtonState, ClothType, CategoryConfig } from "../../types";
import "./MenuButton.css";

export default class MenuButton extends Component<MenuButtonProps, MenuButtonState> {
  constructor(props: MenuButtonProps) {
    super(props);
    this.state = {
      clothStyle: props.defaultCloth || DEFAULT_CLOTH_TYPE,
      openSubMenus: new Set<string>()
    };
  }

  componentDidMount() {
    if (this.props.defaultCloth) {
      this.setState({ clothStyle: this.props.defaultCloth });
    }
  }

  componentDidUpdate(prevProps: MenuButtonProps) {
    if (prevProps.defaultCloth !== this.props.defaultCloth) {
      this.setState({ clothStyle: this.props.defaultCloth || DEFAULT_CLOTH_TYPE });
    }
  }

  changeShowWindow = (style: ClothType) => {
    this.setState({ clothStyle: style });
    this.props.onClothChange?.(style);
  };

  toggleSubMenu = (categoryName: string) => {
    this.setState(prevState => {
      const newOpenSubMenus = new Set(prevState.openSubMenus);
      if (newOpenSubMenus.has(categoryName)) {
        newOpenSubMenus.delete(categoryName);
      } else {
        newOpenSubMenus.add(categoryName);
      }
      return { openSubMenus: newOpenSubMenus };
    });
  };

  createSubMenuItems = (category: CategoryConfig): MenuProps['items'] => {
    return category.items.map(item => ({
      key: item.id,
      label: item.name,
      onClick: () => this.changeShowWindow(item.id)
    }));
  };

  renderCategoryButton = (category: CategoryConfig) => {
    const { clothStyle, openSubMenus } = this.state;
    const isOpen = openSubMenus.has(category.name);
    const hasActiveItem = category.items.some(item => item.id === clothStyle);

    if (category.hasSubMenu) {
      // 有二级菜单的分类（配饰、下装），使用 Dropdown
      const menuItems = this.createSubMenuItems(category);
      
      return (
        <Dropdown
          key={category.category}
          menu={{ items: menuItems }}
          trigger={['click']}
          open={isOpen}
          onOpenChange={(open) => {
            if (open) {
              this.setState(prevState => ({
                openSubMenus: new Set(prevState.openSubMenus).add(category.name)
              }));
            } else {
              this.setState(prevState => {
                const newSet = new Set(prevState.openSubMenus);
                newSet.delete(category.name);
                return { openSubMenus: newSet };
              });
            }
          }}
        >
          <Button
            type={hasActiveItem ? "primary" : "default"}
            className={`MenuButton ${hasActiveItem ? 'MenuButtonActive' : ''} MenuButtonWithSubMenu`}
          >
            {category.name}
            <span className="SubMenuIndicator">{isOpen ? '▲' : '▼'}</span>
          </Button>
        </Dropdown>
      );
    } else {
      // 没有二级菜单的分类，显示所有子项作为独立按钮
      return category.items.map(item => (
        <Button
          key={item.id}
          type={clothStyle === item.id ? "primary" : "default"}
          className={`MenuButton ${clothStyle === item.id ? 'MenuButtonActive' : ''}`}
          onClick={() => this.changeShowWindow(item.id)}
        >
          {item.name}
        </Button>
      ));
    }
  };

  render() {
    const categories = getAllCategories();
    
    return (
      <Flex wrap gap="small" className="MenuButtonContainer">
        {categories.map(category => this.renderCategoryButton(category))}
      </Flex>
    );
  }
}

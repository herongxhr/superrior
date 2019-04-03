import React from 'react';
import { getWeekday } from '../../utils/utils';
import styles from './index.less';

export default ({ itemData }) => {
    const distributionList = itemData.distributionVoList || [];
    return (

        <div className={styles.itemWrap} >
            <div className={styles.title}>
                {getWeekday(itemData.date)} {itemData.acceptCount}/{itemData.count}
            </div>
            <div className={styles.delivery}>
                验收情况
            </div>
            <div>
                <ul style={{ padding: 0, margin: 0, heigth: '100%' }}>
                    {distributionList.map(item => {
                        const catering = item.catering || {};
                        let labelStyle, statusText;
                        if (item.status === '0') {
                            labelStyle = 'waitStart'
                            statusText = '待启动'
                        }
                        if (item.status === '1') {
                            labelStyle = 'waitDelivery'
                            statusText = '待配送'
                        }
                        if (item.status === '2') {
                            labelStyle = 'accepted'
                            statusText = '已验收'
                        }
                        return (
                            <li className={styles.customLi} key={item.id}>
                                <div>
                                    <div>{catering.cateringName}</div>
                                    <div>
                                        <div className={styles.total}>{item.skuCount}件商品</div>
                                        <div className={styles[labelStyle]}>{statusText}</div>
                                    </div>
                                </div>
                            </li>
                        )
                    })
                    }
                </ul>
            </div>
        </div>
    )
}
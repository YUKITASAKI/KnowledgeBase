#!/bin/bash

echo "Creating folders..."

created_list=()
failed_list=()
failed_error=()
exist_list=()

while IFS= read -r line; do
    [ -z "$line" ] && continue

    # すでにディレクトリが存在する場合
    if [ -d "$line" ]; then
        exist_list+=("$line")
        continue
    fi

    # 作成実行（エラー取得）
    error_msg=$(mkdir -p "$line" 2>&1)
    if [ $? -eq 0 ]; then
        created_list+=("$line")
    else
        failed_list+=("$line")
        failed_error+=("$error_msg")
    fi
done < folderlist

echo ""
echo "===== Created Folders ====="
if [ ${#created_list[@]} -eq 0 ]; then
    echo "None"
else
    printf '%s\n' "${created_list[@]}"
fi

echo ""
echo "===== Already Exists (Skipped) ====="
if [ ${#exist_list[@]} -eq 0 ]; then
    echo "None"
else
    printf '%s\n' "${exist_list[@]}"
fi

echo ""
echo "===== Failed to Create ====="
if [ ${#failed_list[@]} -eq 0 ]; then
    echo "None"
else
    for i in "${!failed_list[@]}"; do
        echo "Folder: ${failed_list[$i]}"
        echo "Error : ${failed_error[$i]}"
        echo ""
    done
fi
